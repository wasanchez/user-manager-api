
import {Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserServices";
import { User } from "../entities/User";
import { UserDto } from "../common/dtos/UserDto";

export class UserController {
  private readonly _service: UserService;

  constructor() {
    this._service = new UserService();
  }

  public getAllUsers = (request: Request, response: Response) => {
    let result: UserDto[] = new Array<UserDto>();    

    this._service.getAllUsers()
        .then((users: User[]) => {
            Object.assign(users, result);

            return response.status(200).json({
              status: true,
              data: JSON.stringify(result),
            });
        })
        .catch((err : any) => {
            return response.status(500).json({
                status: false,
                error: err
            });
        });
  };
}