import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Roles } from "../types/roles";
import { Report } from "./Report";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  name!: string;

  @Column({ unique: true, nullable: true, length: 100, type: "varchar" })
  email!: string | null;

  @Column()
  password!: string;

  @Column({ type: "enum", enum: Roles, default: Roles.USER })
  role!: Roles;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ default: false, name: "is_email_verified" })
  isEmailVerified!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => Report, (report) => report.user)
  reports!: Report[];
}
