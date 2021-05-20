import Ajv from "ajv";

interface IEditStyllist {
    name: string;
    surname: string;
    salonId: number;
}
const ajv = new Ajv();
const IEditStyllistValidator = ajv.compile({
    type: "object",
    properties:{
        name: {
            type: "string",
            minLength: 2,
            maxLength: 50,
        },
        surname:{
            type: "string",
            minLength: 2,
            maxLength: 50,
        },
        salonId: {
            type: "integer",
            minimum: 1,
        },
    },
    required: [
        "name",
        "surname",
        "salonId"
    ],
    additionalProperties: false,

});

export { IEditStyllist };
export { IEditStyllistValidator };