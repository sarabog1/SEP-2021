import Ajv from "ajv";

interface IAddStyllist {
    name: string;
    surname: string;
    salonId: number;
}

const ajv = new Ajv();

const IAddStyllistValidator = ajv.compile({
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
        salonId: {
            type: "integer",
            minimum: 1,
        },

    },
    required: [
        "name",
        "surname",
        "salonId",
    ],
    additionalProperties: false,

});

export {IAddStyllist};
export {IAddStyllistValidator};