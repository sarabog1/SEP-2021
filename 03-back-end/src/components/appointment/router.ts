import * as express from "express";
import IApplicationResorces from "../../common/IApplicationResorces.interface";
import IRouter from "../../common/IRouter.interface";
import AppointmentController from './contoller';



export default class AppointmentRouter implements IRouter{
    public setupRoutes(application: express.Application, resources: IApplicationResorces){
        const appointmentController: AppointmentController= new AppointmentController(resources);

    application.get("/appointment",               appointmentController.getAll.bind(appointmentController));
    application.post("/appointment",              appointmentController.add.bind(appointmentController));
    application.delete("/appointment/:id",        appointmentController.deleteById.bind(appointmentController));
    }
}