import { SecurityHelper } from "../common/helpers/securityhelper";
import { Request, Response } from "express";
import { UserService } from "../services/userservice";
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
            let accessToken = this._securityHelper.generateAccessToken(createdUser.username, createdUser.id.toString());

            return response.status(201).json({
               status: true,
               data: {
                    user: newUser,
                    token: accessToken,
                }
             });
             
        }).catch((ex) => {
            return response.status(500).json({
              status: false,
              data: ex
            });
        });       
    };

    public login = (request: Request, response: Response) => {
        const {username, password } = request.body;

        this._service.getUserByUsername(username).then((user) => {
            if (user == null) {
                return response.status(404).json({
                    status: false,
                    error: {
                        message: `Could not find any user with username:${username}`
                    }
                });
            }

            const encriptedPassword = this._securityHelper.encryptPassword(password);
            if (user.password !== encriptedPassword) {
                return response.status(400).json({
                    status: false,
                    error: {
                        message: "Provided username and password did not mutch"
                    }
                });
            }

            const accessToken = this._securityHelper.generateAccessToken(user.username, user.id.toString());
            this._service.updateLastLogin(user.id);
            return response.status(200).json({
                status: true,
                data: {
                    user: user,
                    token: accessToken
                }
            });
        })
        .catch( (ex) => {
            return response.status(500).json({
                status: false,
                error: {
                    message: "There was an unxpected error",
                    detail: ex
                }
            });
        });
    };

    public changePassword = (request: Request, response: Response) => {
        let { username, oldPassword, newPassword } = request.body;
        
        newPassword = this._securityHelper.encryptPassword(newPassword);
        oldPassword = this._securityHelper.encryptPassword(oldPassword);

        this._service.changePassword(username, oldPassword, newPassword).then((user) => {
            return response.json(200).json({
                status: true,
                data: user
            });
        }).catch((ex) => {
            return response.status(400).json({
                status: false,
                message: "There was an unxpected error",
                details: ex
            });
        });
    }
}

