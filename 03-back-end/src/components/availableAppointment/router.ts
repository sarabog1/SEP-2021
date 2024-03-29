import * as express from "express";
import IApplicationResorces from "../../common/IApplicationResorces.interface";
import IRouter from "../../common/IRouter.interface";
import AvailableController from './controller';
import AuthMiddleware from '../../middleware/auth.middleware';


export default class AvailableRouter implements IRouter{
    public setupRoutes(application: express.Application, resources: IApplicationResorces){
        const availableController: AvailableController= new AvailableController(resources);

    application.get("/available",               availableController.getAll.bind(availableController));
    application.get("/available/:id",           availableController.getById.bind(availableController));
    application.get("/styllist/:cid/available", availableController.getAllByStyllist.bind(availableController));
    application.post("/available",  AuthMiddleware.verifyAuthToken, availableController.add.bind(availableController));
    application.put("/available/:id",           availableController.edit.bind(availableController));
    application.delete("/available/:id", AuthMiddleware.verifyAuthToken, availableController.deleteById.bind(availableController));
    }
}