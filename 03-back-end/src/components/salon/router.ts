import * as express from "express";
import SalonService from './service';
import SalonController from './controller';
import IApplicationResorces from '../../common/IApplicationResorces.interface';
import IRouter from "../../common/IRouter.interface";
import SalonModel from './model';


export default class SalonRouter implements IRouter{
    public setupRoutes(application: express.Application, resources: IApplicationResorces){

        const salonService: SalonService= new SalonService(resources.databaseConnection);
        const salonController: SalonController= new SalonController(salonService);

    application.get("/salon",     salonController.getAll.bind(salonController));
    application.get("/salon/:id", salonController.getById.bind(salonController));
    application.post("/salon",    salonController.add.bind(salonController));
    application.put("/salon/:id", salonController.edit.bind(salonController));
    application.delete("/salon/:id", salonController.deleteById.bind(salonController));
    }
}