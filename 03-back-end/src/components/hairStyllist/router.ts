import * as express from "express";
import SalonService from './service';
import SalonController from './controller';
import IApplicationResorces from '../../common/IApplicationResorces.interface';
import IRouter from "../../common/IRouter.interface";
import SalonModel from './model';
import StyllistService from "./service";
import StyllistController from "./controller";


export default class StyllistRouter implements IRouter{
    public setupRoutes(application: express.Application, resources: IApplicationResorces){

        const styllistService: StyllistService= new StyllistService(resources.databaseConnection);
        const styllistController: StyllistController= new StyllistController(styllistService);

    application.get("/styllist/:id",        styllistController.getById.bind(styllistController));
    application.get("/salon/:cid/styllist", styllistController.getAllInSalon.bind(styllistController));
    application.post("/styllist",           styllistController.add.bind(styllistController)); 
    application.put("/styllist/:id",        styllistController.edit.bind(styllistController));
    application.delete("/styllist/:id",        styllistController.deleteById.bind(styllistController));
}
}