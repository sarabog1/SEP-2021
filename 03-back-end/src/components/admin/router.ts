import IRouter from "../../common/IRouter.interface";
import * as express from "express";
import IApplicationResorces from "../../common/IApplicationResorces.interface";
import AdminController from "./controller";
import AuthMiddleware from "../../middleware/auth.middleware";

export default class AdminRouter implements IRouter{
    public setupRoutes(application: express.Application, resources: IApplicationResorces){
        const adminController: AdminController= new AdminController(resources);

    application.get("/admin", AuthMiddleware.verifyAuthToken,           adminController.getAll.bind(adminController));
    application.get("/admin/:id",  AuthMiddleware.verifyAuthToken,      adminController.getById.bind(adminController));
    application.post("/admin",  AuthMiddleware.verifyAuthToken,         adminController.add.bind(adminController));
    application.put("/admin/:id",  AuthMiddleware.verifyAuthToken,      adminController.edit.bind(adminController));
    application.delete("/admin/:id", AuthMiddleware.verifyAuthToken,   adminController.delete.bind(adminController));
    }
}