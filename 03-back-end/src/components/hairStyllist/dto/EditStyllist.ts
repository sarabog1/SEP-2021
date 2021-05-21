import Ajv from "ajv";

interface IEditStyllist {
    name: string;
    surname: string;
    
}
const ajv = new Ajv();
const IEditStyllistValidator = ajv.compile({
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
        

    },
    required: [
        "name",
        "surname",
        
    ],
    additionalProperties: false,

});

export { IEditStyllist };
export { IEditStyllistValidator };