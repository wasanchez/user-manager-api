import Ajv, { JSONSchemaType } from "ajv";

interface ILoginPayload {
  username: string;
  password: string;
}

const LoginSchema: JSONSchemaType<ILoginPayload> = {
  type: "object",
  properties: {
    username: { type: "string", nullable: false },
    password: { type: "string", nullable: false }
  },
  required: ["username", "password"],
  additionalProperties: false,
};

export default LoginSchema; 