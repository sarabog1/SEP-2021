import * as express from "express";
import SalonService from './service';
import SalonController from './controller';


export default class SalonRouter{
    public static setupRoutes(application: express.Application){

    const salonService: SalonService= new SalonService();
    const salonController: SalonController= new SalonController(salonService);

    application.get("/salon", salonController.getAll.bind(salonController));
    application.get("/salon/:id", salonController.getById.bind(salonController))

    }
}