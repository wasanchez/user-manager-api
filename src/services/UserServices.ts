
import { IsNull, Not, Repository } from "typeorm";
import { User } from "../entities/User";
import "reflect-metadata";
import { UserManagerDataSource } from "../UserManagerDataSource"

export class UserService {
    private readonly _datasource : UserManagerDataSource;
    private readonly _repository: Repository<User>;

    constructor() {
        this._datasource = new UserManagerDataSource();   
        this._datasource.initilize();     
        this._repository = this._datasource.getDataSource().getRepository(User);
    }

    public getUserById (id:number) : Promise<User | null> {
      
      return this._datasource
        .getDataSource()
        .getRepository(User)
        .findOneBy({ id: id });
    }

    public getAllUsers() : Promise<User[]> {       
        return this._datasource
        .getDataSource()
        .getRepository(User)
        .find();
    }
}