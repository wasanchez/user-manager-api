import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  password: string

  @Column()
  email: string

  @Column()
  role: string

  @Column()
  lastName: string

  @Column()
  role: string

  @Column()
  firstName: string
}