import config from "config";
import Jwt from "jsonwebtoken";
import crypto from "crypto";

export class SecurityHelper {

    private readonly _jwtSecret: string = config.get<string>("security.jwtSecret");
    private readonly _jwtExpirationInSeconds: string = config.get<string>("security.jwtExpirationInSeconds");

    public generateAccessToken (username : string, userId: string) : string 
    {
        return Jwt.sign(
            {
                username, 
                userId
            },
            this._jwtSecret,
            {
                expiresIn: this._jwtExpirationInSeconds
            }
        );  
    }

    public encryptPassword (password: string) : string 
    {
        const hash = crypto.createHash("sha256");
        hash.update(password);
        return hash.digest("hex");
    }

    public verifyToken(token : string) : boolean 
    {   
        try {
            const decode = Jwt.verify(token, this._jwtSecret);
            return true;    
        } catch (error) {
            return false;
        }
    }
}