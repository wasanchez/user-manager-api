import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 100,
  })
  username!: string;

  @Column()
  password!: string;

  @Column({ length: 200 })
  email!: string;

  @Column({ length: 20 })
  role!: string;

  @Column({ length: 100 })
  lastName!: string;

  @Column({ length: 100 })
  firstName!: string;

  @Column("date")
  birthdate?: Date
}