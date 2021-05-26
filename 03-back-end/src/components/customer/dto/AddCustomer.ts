import Ajv from "ajv";

interface IAddCustomer {
    name: string;
    surname: string;
    phone: number;
}

const ajv = new Ajv();

const IAddCustomerValidator = ajv.compile({
    type: "object",
    properties: {
        name: {
            type: "string",
            minLength: 2,
            maxLength: 64,
        },
        surname: {
            type: "string",
            minLength: 2,
            maxLength: 64,
        },
        phone: {
            type: "string", 
            minLength: 8,
            maxLength: 12,
            
        },

    },
    required: [
        "name",
        "surname",
        "phone",
    ],
    additionalProperties: false,

});

export {IAddCustomer};
export {IAddCustomerValidator};