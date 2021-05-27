import Ajv from "ajv";

interface IAddAppointment {
    availableAppointmentId: number;
    customerId: number;
    email: string;
    
}
const ajv = new Ajv();
const IAddAppointmentValidator = ajv.compile({
    type: "object",
    properties:{
        availableAppointmentId: {
            type: "integer",
            minimum: 1,
        },
        customerId: {
            type: "integer",
            minimum: 1,
        },
        email: {
            type: "string",
            minLength: 6,
        }
       
    },
    required: [
        "availableAppointmentId",
        "customerId"
        
    ],
    additionalProperties: false,

});

export { IAddAppointment };
export { IAddAppointmentValidator };