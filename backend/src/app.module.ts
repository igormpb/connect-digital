import { forwardRef, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { TransactionsModule } from "./transactions/transactions.module";
import { TransactionsService } from "./transactions/transactions.service";
import { TransactionsController } from "./transactions/transactions.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PaymentsModule } from "./payments/payments.module";
import { PaymentsService } from "./payments/payments.service";
import { PaymentsController } from "./payments/payments.controller";

import { Transaction, Customer, CustomerAddress, Webhook } from "./entities";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST || "localhost",
      port: parseInt(process.env.DB_PORT || "5432"),
      username: process.env.DB_USERNAME || "connect-digital",
      password: process.env.DB_PASSWORD || "connect-digital",
      database: process.env.DB_NAME || "connect-digital",
      entities: [Transaction, Customer, CustomerAddress, Webhook],
      migrations: ["dist/migrations/*.js"],
      synchronize: true,
      migrationsRun: true,
    }),
    TypeOrmModule.forFeature([Transaction, Customer, CustomerAddress, Webhook]),
    forwardRef(() => TransactionsModule),
    PaymentsModule,
  ],
  controllers: [AppController, TransactionsController, PaymentsController],
  providers: [AppService, TransactionsService, PaymentsService],
})
export class AppModule {}
