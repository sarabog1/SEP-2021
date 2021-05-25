import Ajv from "ajv";

interface IEditLocation {
    street: string;
    number: number;
    
}
const ajv = new Ajv();
const IEditLocationValidator = ajv.compile({
    type: "object",
    properties:{
        street: {
            type: "string",
            minLength: 2,
            maxLength: 128,
        },
        number:{
            type: "integer",
            minimum: 1,
        },
       
    },
    required: [
        "street",
        "number"
        
    ],
    additionalProperties: false,

});

export { IEditLocation };
export { IEditLocationValidator };