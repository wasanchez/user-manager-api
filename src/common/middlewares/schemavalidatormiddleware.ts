
import Ajv from "ajv";
import addFormate from "ajv-formats";
import { Request, Response, NextFunction } from "express";

class SchemaValidatorMiddleware {

    public verify = (schema: Object) => {
        if (!schema) {
             throw new Error("Schema not provided");
        }

        return (request: Request, response: Response, next: NextFunction) => {
            const { body } = request;
            const avj = new Ajv();
            addFormate(avj, ["date", "date-time"]);
            const validate = avj.compile(schema);
            const isValid = validate(body);

            if (isValid) return next();

            return response.status(400).json({
                status:false,
                error: {
                    message: `Invalid Payload: ${avj.errorsText(validate.errors)}`,
                    data: validate.errors
                }
            });
        };
    };
}

export default  new SchemaValidatorMiddleware();