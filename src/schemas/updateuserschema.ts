import Ajv, { JSONSchemaType } from "ajv";

interface IUpdateUserPayload {
    email: string;
    lastName: string;
    firstName: string;
    birthdate?: string;
}

const UpdateUserSchema: JSONSchemaType<IUpdateUserPayload> = {
    type: "object",
    properties: {
        email: { type: "string", nullable: false, pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$" },
        lastName: { type: "string" },
        firstName: { type: "string" },
        birthdate: { type: "string", nullable: true, format: "date" }
    },
    maxProperties: 4,
    minProperties: 1,
    required: [],
    additionalProperties: false
};

export default UpdateUserSchema;