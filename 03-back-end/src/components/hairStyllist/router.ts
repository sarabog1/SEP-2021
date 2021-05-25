import * as express from "express";

import IApplicationResorces from '../../common/IApplicationResorces.interface';
import IRouter from "../../common/IRouter.interface";

import StyllistController from "./controller";


export default class StyllistRouter implements IRouter{
    public setupRoutes(application: express.Application, resources: IApplicationResorces){

        
        const styllistController: StyllistController= new StyllistController(resources);

    application.get("/styllist/:id",        styllistController.getById.bind(styllistController));
    application.get("/salon/:cid/styllist", styllistController.getAllInSalon.bind(styllistController));
    application.post("/styllist",           styllistController.add.bind(styllistController)); 
    application.put("/styllist/:id",        styllistController.edit.bind(styllistController));
    application.delete("/styllist/:id",        styllistController.deleteById.bind(styllistController));
}
}