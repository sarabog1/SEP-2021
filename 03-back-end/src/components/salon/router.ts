import * as express from "express";
import SalonService from './service';
import SalonController from './controller';
import IApplicationResorces from '../../common/IApplicationResorces.interface';
import IRouter from "../../common/IRouter.interface";


export default class SalonRouter implements IRouter{
    public setupRoutes(application: express.Application, resources: IApplicationResorces){

    const salonService: SalonService= new SalonService(resources.databaseConnection);
    const salonController: SalonController= new SalonController(salonService);

    application.get("/salon", salonController.getAll.bind(salonController));
    application.get("/salon/:id", salonController.getById.bind(salonController))
    }
}