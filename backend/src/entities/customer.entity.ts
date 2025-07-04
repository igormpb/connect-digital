import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Transaction } from "./transaction.entity";
import { CustomerAddress } from "./customer-address.entity";
import { forwardRef } from "@nestjs/common";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  externalId: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  documentType: string;

  @Column()
  documentValue: string;

  @Column()
  createdAt: string;

  @OneToMany(() => Transaction, (transaction) => transaction.customer)
  transactions: Transaction[];

  @OneToOne(() => CustomerAddress, { cascade: true, eager: true })
  @JoinColumn()
  address: CustomerAddress;
}
