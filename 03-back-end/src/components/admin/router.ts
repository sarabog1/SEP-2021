import IRouter from "../../common/IRouter.interface";
import * as express from "express";
import IApplicationResorces from "../../common/IApplicationResorces.interface";
import AdminController from "./controller";

export default class AdminRouter implements IRouter{
    public setupRoutes(application: express.Application, resources: IApplicationResorces){
        const adminController: AdminController= new AdminController(resources);

    application.get("/admin",            adminController.getAll.bind(adminController));
    application.get("/admin/:id",        adminController.getById.bind(adminController));
    application.post("/admin",           adminController.add.bind(adminController));
    application.put("/admin/:id",        adminController.edit.bind(adminController));
    application.delete("/admin/:id",     adminController.delete.bind(adminController));
    }
}