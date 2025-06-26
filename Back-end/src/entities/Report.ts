import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./User";

export enum Category {
  CATEGORY1 = "CATEGORY1",
  CATEGORY2 = "CATEGORY2",
  CATEGORY3 = "CATEGORY3"
}

export enum ReportStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  RESOLVED = "RESOLVED"
}

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ nullable: true, type: "text" })
  description?: string;

  @Column({
    type: "enum",
    enum: Category
  })
  category!: Category;

  @Column({
    type: "enum",
    enum: ReportStatus,
    default: ReportStatus.PENDING
  })
  status!: ReportStatus;

  @Column({ default: false })
  isEmergency!: boolean;

  @Column()
  userId!: number;

  @ManyToOne(() => User, user => user.reports)
  user!: User;

  @CreateDateColumn()
  createdAt!: Date;
}
