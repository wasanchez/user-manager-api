
import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/userservice";
import { User } from "../entities/User";
import { UserDto } from "../common/dtos/userdto";
import { UpdateUserDto} from "../common/dtos/updateuserdto";

export class UserController {
  private readonly _service: UserService;

  constructor() {
    this._service = new UserService();
  }
 
  public getAll = (request: Request, response: Response) => {
    let result: UserDto[] = new Array<UserDto>();    

    this._service.getAllUsers()
        .then((users: User[]) => {
            Object.assign<UserDto[], User[]>(result, users);

            return response.status(200).json({
              status: true,
              data: result,
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
    const id  = Number.parseInt(request.params["id"]);
    
    let result = new UserDto();

    this._service.getUserById(id)
      .then( (user : User | null) => {
        if (user) {
          Object.assign<UserDto, User>(result, user);

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

  public updateUserInfo = (request: Request, response: Response) => {
    const payload = request.body;
    const id  = Number.parseInt(request.params.id);

    let changes = new UpdateUserDto();
    Object.assign(changes, payload);

    this._service.getUserById(id).then((user) => {
      if (user == null) {
        response.status(404).json({
          status: false,
          message: "User not found"
        });
      }
      //update user information
      this._service.updateUser(id, changes).then((result) => {
        if (result) {
          response.status(200).json({
            status: true,
            data: result
          });
        }
      }).catch((ex) => {
        response.status(500).json({
          status: false,
          message: `Unexpected error has occurred.\nError: ${ex}`
        });
      });
    });
  }

 

}