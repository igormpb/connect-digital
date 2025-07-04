import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Customer } from "./customer.entity";
import { forwardRef } from "@nestjs/common";

@Entity()
export class CustomerAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @Column()
  streetNumber: string;

  @Column({ nullable: true })
  complement: string;

  @Column()
  zipCode: string;

  @Column()
  neighborhood: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @OneToOne(() => Customer, (customer) => customer.address)
  customer: Customer;
}
