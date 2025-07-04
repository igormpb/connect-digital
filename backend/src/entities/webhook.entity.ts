import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Webhook {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  processed: boolean;

  @Column({ type: "jsonb" })
  data: any;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  receivedAt: string;
}
