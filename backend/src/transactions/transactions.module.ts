import { Module } from "@nestjs/common";
import { TransactionsController } from "./transactions.controller";
import { TransactionsService } from "./transactions.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Transaction, Customer, CustomerAddress, Webhook } from "../entities";

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, Customer, CustomerAddress, Webhook]),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
