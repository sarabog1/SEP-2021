import Ajv from "ajv";

interface IAddAvailable {
    startsAt: Date;
    endAt: Date;
    isAvailable: boolean;
    hairStyllistId: number;
    
}
const ajv = new Ajv();
const IAddAvailableValidator = ajv.compile({
    type: "object",
    properties:{
        startsAt: {
            type: "string",     
            
        },
        endAt: {
            type: "string",     
            
        },
        isAvailable:{
            type: "boolean",
        },
        hairStyllistId: {
            type: "integer",
            minimum: 1,
        }
       
    },
    required: [
        "startsAt",
        "endAt",
        "isAvailable",
        "hairStyllistId",
        
    ],
    additionalProperties: false,

});

export { IAddAvailable };
export { IAddAvailableValidator };