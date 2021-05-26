import Ajv from "ajv";

interface IAddAppointment {
    availableAppointmentId: number;
    customerId: number;
    
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