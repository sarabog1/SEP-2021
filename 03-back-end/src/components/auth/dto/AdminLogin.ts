import Ajv from "ajv";

interface IAdminlogin {
    username: string;
    password: string;
}

const ajv = new Ajv();

const IAdminloginValidator = ajv.compile({
    type: "object",
    properties: {
        username: {
            type: "string",
            minLength: 5,
            maxLength: 64,
        },
        password: {
            type: "string",
            minLength: 6,
            maxLength: 255,
        },
    },
    required: [
        "username",
        "password",
    ],
    additionalProperties: false,
});

export { IAdminlogin };
export { IAdminloginValidator };