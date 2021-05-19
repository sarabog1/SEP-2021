import Ajv from "ajv";

interface IEditSalon {
    name: string;
    locationId: number;
    serviceId: number;
}
const ajv = new Ajv();
const IEditSalonValidator = ajv.compile({
    type: "object",
    properties:{
        name: {
            type: "string",
            minLength: 2,
            maxLength: 128,
        },
        locationId:{
            type: "integer",
            minimum: 1,
        },
        serviceId: {
            type: "integer",
            minimum: 1,
        },
    },
    required: [
        "name",
        "locationId",
        "serviceId"
    ],
    additionalProperties: false,

});

export { IEditSalon };
export { IEditSalonValidator };