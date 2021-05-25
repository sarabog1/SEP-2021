import Ajv from "ajv";

interface IEditService {
    type: string;
    price: number;
    
}
const ajv = new Ajv();
const IEditServiceValidator = ajv.compile({
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

export { IEditService };
export { IEditServiceValidator };