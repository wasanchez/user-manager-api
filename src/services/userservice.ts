
import { Repository } from "typeorm";
import { User } from "../entities/User";
import "reflect-metadata";
import AppDataSource from "../datasources/AppDataSource";
import { UpdateUserDto } from "../common/dtos/updateuserdto";

export class UserService {
    private readonly _repository: Repository<User>;

    constructor() {
        this._repository = AppDataSource.instance.getRepository(User);
    }

    public getUserById (id:number) : Promise<User | null> {
      
      return this._repository.findOneBy({ id: id });
    }

    public getAllUsers() : Promise<User[]> {       
        return this._repository.find();
    }

    public createUser(newUser : User) : Promise<User>
    {   
        return this.getUserByUsername(newUser.username)
                    .then(( existingUser) => {
                        if (existingUser == null){
                            return this._repository.save(newUser);
                        }else {
                            throw new Error(`User ${newUser.username} already exists.`);
                        }   
                    }).catch( (ex) => {
                        throw ex;
                    });
    }

    public getUserByUsername(username: string) : Promise<User | null>
    {
        return this._repository.findOneBy({ username: username});
    }

    public updateUser(id: number, user : UpdateUserDto) : Promise<User | null> {
        return this._repository.update(id, user).then( (result) => {
            if (result) {
                return this.getUserById(id);
            }else {
                throw new Error("There was a probleme updating data");
            }
        }).catch((ex) => {
            throw new Error("There was unexpected error.\n" + ex.message);
        });
        
    }

    public updateLastLogin(id: number) : void {
        this._repository.update(id, {lastLogin: new Date()});
    }
}