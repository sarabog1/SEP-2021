
import {Request, Response, NextFunction} from "express";
import LocationModel from './model';
import IErrorResponse from '../../common/IError.interface';
import { IAddLocation, IAddLocationValidator } from './dto/AddLocation';
import { IEditLocation, IEditLocationValidator } from './dto/EditLocation';
import BaseController from '../../common/BaseController';

class LocationController extends BaseController{
    

    async getAll(req: Request, res: Response, next: NextFunction) {
        const locations = await this.services.locationService.getAll();

        res.send(locations);
    }
    async getById(req: Request, res: Response, next: NextFunction) {
        const id: string = req.params.id;
        const locationId: number = +id;

        if (locationId <=0){
            res.sendStatus(400);
            return;
        }
        const data: LocationModel|null|IErrorResponse = await this.services.locationService.getById(locationId);
        if(data === null){
            res.sendStatus(404);
            return;
        } 

       res.status(500).send(data);
       
    }

    async add(req: Request, res:Response, next: NextFunction){
        const data = req.body;

        if(!IAddLocationValidator(data)){
            res.status(400).send(IAddLocationValidator.errors);
            return;
        }

        
       const result = await this.services.locationService.add(data as IAddLocation);
        
       res.send(result);
    }

    public async edit(req: Request, res: Response){
        const locationId = +(req.params.id);

        if (locationId <= 0){
            res.sendStatus(400);
            return;
        }

        if(!IEditLocationValidator(req.body)){
            res.status(400).send(IEditLocationValidator.errors);
            return;
        }

        const result = await this.services.locationService.getById(locationId)

        if(result === null){
            res.sendStatus(404);
            return;
        }

        if (!(result instanceof LocationModel)) {
            res.status(500).send(result);
            return;
        }

        

       res.send(await this.services.locationService.edit(locationId, req.body as IEditLocation));
        

    }

    async deleteById(req: Request, res:Response, next: NextFunction){
        const id: string = req.params.id;

        const locationId: number = +id;

        if (locationId <= 0){
            res.status(400).send("Inavild ID number");
            return;
        }

        res.send(await this.services.locationService.delete(locationId));
    }
}

export default LocationController;