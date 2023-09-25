import Ajv, {JSONSchemaType} from "ajv";

interface IChangePassword {
    username: string;
    oldPassword: string;
    newPassword: string
}

const ChangePasswordSchema : JSONSchemaType<IChangePassword> =
{
    type: "object",
    properties: {
        username: { type: "string"},
        oldPassword: { type: "string"},
        newPassword: { type: "string"}
    },
    required: ["username", "oldPassword", "newPassword"],
    additionalProperties: false
}

export default ChangePasswordSchema;