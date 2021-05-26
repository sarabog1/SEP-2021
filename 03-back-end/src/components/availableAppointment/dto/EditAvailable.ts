import Ajv from "ajv";

interface IEditAvailable {
    
    isAvailable: boolean;
    
    
}
const ajv = new Ajv();
const IEditAvailableValidator = ajv.compile({
    type: "object",
    properties:{
       
        isAvailable:{
            type: "boolean",
        },
       
    },
    required: [
        
        "isAvailable",
        
        
    ],
    additionalProperties: false,

});

export { IEditAvailable };
export { IEditAvailableValidator };