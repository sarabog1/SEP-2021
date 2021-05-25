import IRouter from "../../common/IRouter.interface";
import * as express from "express";
import IApplicationResorces from "../../common/IApplicationResorces.interface";
import ServiceController from './controller';


export default class ServiceRouter implements IRouter{
    public setupRoutes(application: express.Application, resources: IApplicationResorces){

        
        const serviceController: ServiceController = new ServiceController(resources);

    application.get("/service",     serviceController.getAll.bind(serviceController));
    application.get("/service/:id", serviceController.getById.bind(serviceController));
    application.post("/service",    serviceController.add.bind(serviceController));
    application.put("/service/:id", serviceController.edit.bind(serviceController));
    application.delete("/service/:id", serviceController.deleteById.bind(serviceController));
    }
}