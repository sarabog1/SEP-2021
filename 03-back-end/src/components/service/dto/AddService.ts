import Ajv from "ajv";

interface IAddService {
    type: string;
    price: number;
    
}
const ajv = new Ajv();
const IAddServiceValidator = ajv.compile({
    type: "object",
    properties:{
        type: {
            type: "string",
            minLength: 2,
            maxLength: 128,
        },
        price:{
            type: "integer",
            minimum: 1,
        },
        
    },
    required: [
        "type",
        "price"
        
    ],
    additionalProperties: false,

});

export { IAddService };
export { IAddServiceValidator };