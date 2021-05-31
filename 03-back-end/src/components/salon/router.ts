import * as express from "express";
import SalonController from './controller';
import IApplicationResorces from '../../common/IApplicationResorces.interface';
import IRouter from "../../common/IRouter.interface";
import AuthMiddleware from "../../middleware/auth.middleware";



export default class SalonRouter implements IRouter{
    public setupRoutes(application: express.Application, resources: IApplicationResorces){
        const salonController: SalonController= new SalonController(resources);

    application.get("/salon",     salonController.getAll.bind(salonController));
    application.get("/salon/:id", salonController.getById.bind(salonController));
    application.post("/salon", AuthMiddleware.verifyAuthToken,    salonController.add.bind(salonController));
    application.put("/salon/:id", AuthMiddleware.verifyAuthToken, salonController.edit.bind(salonController));
    application.delete("/salon/:id", AuthMiddleware.verifyAuthToken, salonController.deleteById.bind(salonController));
    }
}