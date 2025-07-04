import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Customer } from "./customer.entity";
import { forwardRef } from "@nestjs/common";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  externalId: number;

  @Column("decimal")
  amount: number;

  @Column("decimal")
  refundedAmount: number;

  @Column()
  companyId: number;

  @Column()
  installments: number;

  @Column()
  paymentMethod: string;

  @Column()
  status: string;

  @Column({ nullable: true })
  secureId: string;

  @Column({ nullable: true })
  secureUrl: string;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;

  @Column({ nullable: true })
  paidAt: string;

  @ManyToOne(() => Customer, (customer) => customer.transactions, {
    cascade: true,
    eager: true,
  })
  customer: Customer;
}
