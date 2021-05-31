import IRouter from "../../common/IRouter.interface";
import * as express from "express"
import IApplicationResorces from "../../common/IApplicationResorces.interface";
import CustomerController from './controller';
import AuthMiddleware from "../../middleware/auth.middleware";


export default class CustomerRouter implements IRouter{
    public setupRoutes(application: express.Application, resources: IApplicationResorces){

        
        const customerController: CustomerController= new CustomerController(resources);

    application.get("/customer", AuthMiddleware.verifyAuthToken,       customerController.getAll.bind(customerController));
    application.get("/customer/:id", AuthMiddleware.verifyAuthToken,      customerController.getById.bind(customerController));
    application.post("/customer",           customerController.add.bind(customerController)); 
    application.put("/customer/:id",        customerController.edit.bind(customerController));
    application.delete("/customer/:id",  AuthMiddleware.verifyAuthToken,      customerController.deleteById.bind(customerController));
}
}