import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, Timestamp } from "typeorm"

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 100,
    nullable: false,
    unique: true
  })
  username!: string;

  @Column({ nullable: false })
  password!: string;

  @Column({
    length: 200,
    unique: true,
  })
  email!: string;

  @Column({ length: 20, nullable: false, })
  role!: string;

  @Column({ length: 100, nullable: false })
  lastName!: string;

  @Column({ length: 100, nullable: false })
  firstName!: string;

  @Column("date")
  birthdate?: Date;

  @Column("date")
  lastLogin?: Date
  
  @Column({name: "active", default: true})
  isActive!: boolean

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

}

export enum Role {
  User = "USER",
  Customer = "CUSTOMER",
  Admin = "ADMIN"
}