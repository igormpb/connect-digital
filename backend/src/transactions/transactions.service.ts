import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import * as dayjs from "dayjs";
import { Transaction, Customer, CustomerAddress, Webhook } from "../entities";

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,

    @InjectRepository(Customer)
    private readonly customersRepository: Repository<Customer>,

    @InjectRepository(Webhook)
    private readonly webhookRepository: Repository<Webhook>,

    @InjectRepository(CustomerAddress)
    private readonly addressRepository: Repository<CustomerAddress>,
  ) {}

  async create(dto: CreateTransactionDto) {
    try {
      const webhook = this.webhookRepository.create({
        data: dto,
        processed: false,
      });
      await this.webhookRepository.save(webhook);

      const existingTransaction = await this.transactionsRepository.findOne({
        where: { externalId: dto.data.id },
      });

      if (existingTransaction) {
        if (webhook.processed) {
          return { message: "Transação já processada." };
        }

        Object.assign(existingTransaction, {
          amount: dto.data.amount,
          refundedAmount: dto.data.refundedAmount,
          companyId: dto.data.companyId,
          installments: dto.data.installments,
          paymentMethod: dto.data.paymentMethod,
          status: dto.data.status,
          secureId: dto.data.secureId,
          secureUrl: dto.data.secureUrl,
          updatedAt: dayjs(dto.data.updatedAt).format(),
          paidAt: dto.data.paidAt ? dayjs(dto.data.paidAt).format() : null,
        });

        await this.transactionsRepository.save(existingTransaction);
        webhook.processed = true;
        await this.webhookRepository.save(webhook);

        return { message: "Transação atualizada com sucesso." };
      }

      let customer = await this.customersRepository.findOne({
        where: { externalId: dto.data.customer.id },
        relations: ["address"],
      });

      if (!customer) {
        const address = this.addressRepository.create(
          dto.data.customer.address,
        );
        await this.addressRepository.save(address);

        customer = this.customersRepository.create({
          externalId: dto.data.customer.id,
          name: dto.data.customer.name,
          email: dto.data.customer.email,
          phone: dto.data.customer.phone,
          documentType: dto.data.customer.document.type,
          documentValue: dto.data.customer.document.number,
          createdAt: dayjs(dto.data.customer.createdAt).format(),
          address,
        });
        await this.customersRepository.save(customer);
      } else if (
        customer.address &&
        customer.address.zipCode !== dto.data.customer.address.zipCode
      ) {
        Object.assign(customer.address, dto.data.customer.address);
        await this.addressRepository.save(customer.address);
      }

      const transaction = this.transactionsRepository.create({
        externalId: dto.data.id,
        amount: dto.data.amount,
        refundedAmount: dto.data.refundedAmount,
        companyId: dto.data.companyId,
        installments: dto.data.installments,
        paymentMethod: dto.data.paymentMethod,
        status: dto.data.status,
        secureId: dto.data.secureId,
        secureUrl: dto.data.secureUrl,
        createdAt: dayjs(dto.data.createdAt).format(),
        updatedAt: dayjs(dto.data.updatedAt).format(),
        paidAt: dto.data.paidAt ? dayjs(dto.data.paidAt).format() : "",
        customer,
      });

      await this.transactionsRepository.save(transaction);
      webhook.processed = true;
      await this.webhookRepository.save(webhook);

      return { message: "Transação criada com sucesso." };
    } catch (error) {
      console.error("Erro ao criar transação", error);
      throw new InternalServerErrorException("Erro ao processar a transação.");
    }
  }

  async findAll(filters: any) {
    if (!filters || Object.keys(filters).length === 0) {
      throw new BadRequestException(
        "Informe pelo menos um parâmetro de filtro.",
      );
    }

    try {
      const query = this.transactionsRepository
        .createQueryBuilder("transaction")
        .leftJoinAndSelect("transaction.customer", "customer")
        .leftJoinAndSelect("customer.address", "address");

      const allFilters = {
        externalId: "transaction.externalId",
        amount: "transaction.amount",
        refundedAmount: "transaction.refundedAmount",
        companyId: "transaction.companyId",
        installments: "transaction.installments",
        paymentMethod: "transaction.paymentMethod",
        status: "transaction.status",
        secureId: "transaction.secureId",
        secureUrl: "transaction.secureUrl",
        createdAt: "transaction.createdAt",
        updatedAt: "transaction.updatedAt",
        paidAt: "transaction.paidAt",

        name: "customer.name",
        email: "customer.email",
        phone: "customer.phone",
        documentType: "customer.documentType",
        documentValue: "customer.documentValue",
        customerCreatedAt: "customer.createdAt",

        street: "address.street",
        streetNumber: "address.streetNumber",
        complement: "address.complement",
        zipCode: "address.zipCode",
        neighborhood: "address.neighborhood",
        city: "address.city",
        state: "address.state",
        country: "address.country",
      };

      for (const [key, value] of Object.entries(filters)) {
        const field = allFilters[key];
        if (field && value !== undefined && value !== "") {
          query.andWhere(`${field} ILIKE :${key}`, { [key]: `%${value}%` });
        }
      }

      return query.getMany();
    } catch (error) {
      console.error("Erro ao buscar transações", error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException("Erro ao buscar transações.");
    }
  }
}
