import Ajv, {JSONSchemaType} from "ajv";
import { Role } from "../entities/User";

interface UserPayload {
  username: string
  password: string
  email: string
  role?: string
  lastName: string
  firstName: string
  birthdate?: string,
  isActive?: boolean
}

const UserSchema: JSONSchemaType<UserPayload> = {
  type: "object",
  properties: {
    username: { type: "string", nullable: false },
    password: { type: "string", nullable: false },
    email: { type: "string", nullable: false, pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$" },
    role: { type: "string", nullable: true, enum: Object.values(Role) },
    lastName: { type: "string" },
    firstName: { type: "string" },
    birthdate: { type: "string", nullable: true, format: "date" },
    isActive: { type: "boolean", nullable: true }
  },
  required: ["username", "password", "email", "lastName", "firstName"],
  additionalProperties: false,
};

export default UserSchema;