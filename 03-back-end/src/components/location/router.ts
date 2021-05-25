import IRouter from '../../common/IRouter.interface';
import * as express from "express";
import IApplicationResorces from '../../common/IApplicationResorces.interface';
import LocationService from './service';
import LocationController from './controller';

export default class LocationRouter implements IRouter{
    public setupRoutes(application: express.Application, resources: IApplicationResorces){

        
        const locationController: LocationController= new LocationController(resources);

        application.get("/location",        locationController.getAll.bind(locationController));
        application.get("/location/:id",    locationController.getById.bind(locationController));
        application.post("/location",       locationController.add.bind(locationController));
        application.put("/location/:id",    locationController.edit.bind(locationController));
        application.delete("/location/:id", locationController.deleteById.bind(locationController));
    }
}