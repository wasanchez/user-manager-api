import { SecurityHelper } from "../common/helpers/securityhelper";
import { Request, Response } from "express";
import { UserService } from "../services/userservices";
import { Role, User } from "../entities/User";

export class AuthController {
    private readonly _securityHelper : SecurityHelper;
    private readonly _service : UserService;

    constructor() {
        this._securityHelper = new SecurityHelper();
        this._service = new UserService();
    }

    public register = (request: Request, response: Response) => {
        const payload = request.body;
        const newUser = new User();         
        Object.assign(newUser, payload);

        newUser.password = this._securityHelper.encryptPassword(payload.password);
        newUser.role = newUser.role ?? Role.User;
        this._service.createUser(newUser).then((createdUser) =>
        {
            const accessToken = this._securityHelper.generateAccessToken(createdUser.username, createdUser.id.toString());

            return response.status(201).json({
               status: true,
               data: newUser,
               token: accessToken,
             });
        }).catch((ex) => {
            return response.status(500).json({
              status: false,
              data: ex
            });
        });       
    };

}

