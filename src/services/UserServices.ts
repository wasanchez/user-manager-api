
import { IsNull, Not, Repository } from "typeorm";
import { User } from "../entities/User";
import "reflect-metadata";
import AppDataSource from "../datasources/AppDataSource";

export class UserService {
    private readonly _repository: Repository<User>;

    constructor() {
        this._repository = AppDataSource.instance.getRepository(User);
    }

    public getUserById (id:number) : Promise<User | null> {
      
      return this._repository
        .findOneBy({ id: id });
    }

    public getAllUsers() : Promise<User[]> {       
        return this._repository.find();
    }

    public createUser(user : User) {

    }
}