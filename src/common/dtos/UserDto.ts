export class UserDto {
    id!: number;
    username!: string;
    email!: string;
    role!: string;
    lastName!: string;
    firstName!: string;
    birthdate?: Date;
}