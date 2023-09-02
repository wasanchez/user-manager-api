
import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/userservices";
import { User } from "../entities/User";
import { UserDto } from "../common/dtos/UserDto";

export class UserController {
  private readonly _service: UserService;

  constructor() {
    this._service = new UserService();
  }
 
  public getAll = (request: Request, response: Response) => {
    let result: UserDto[] = new Array<UserDto>();    

    this._service.getAllUsers()
        .then((users: User[]) => {
            Object.assign(result, users);

            return response.status(200).json({
              status: true,
              data: JSON.stringify(result),
            });
        })
        .catch((err : any) => {
            console.error("Error: ", err);
            return response.status(500).json({
                status: false,
                error: err
            });
        });
  };

  public get = (request: Request, response:  Response)  => {
    const { id } = request.body;
    let result = new UserDto();

    this._service.getUserById(id)
      .then( (user : User | null) => {
        if (user) {
          Object.assign(user, result);

          return response.status(200).json({
            status: true,
            data: result
          });
        }else {
          return response.status(404).json({
            status: false,
            message: "Not found"
          });
        }
      })
      .catch((ex) => {
        return response.status(500).json({
          status: false,
          message: `Unexpected error has occurred.\nError: ${ex}`
        });
      });
  }
}