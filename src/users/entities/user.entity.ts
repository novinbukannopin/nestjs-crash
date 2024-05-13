import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  apiKey: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  phoneNumber: string;

  @Column({ nullable: true, type: "text" })
  twoFASecret: string;

  @Column({ default: false, type: "boolean" })
  enable2FA: boolean;
}