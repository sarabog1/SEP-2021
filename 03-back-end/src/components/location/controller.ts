import LocationService from './service';
import {Request, Response, NextFunction} from "express";
import LocationModel from './model';
import IErrorResponse from '../../common/IError.interface';

class LocationController{
    private locationService: LocationService;

    constructor(locationService: LocationService) {
        this.locationService = locationService;
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        const locations = await this.locationService.getAll();

        res.send(locations);
    }
    async getById(req: Request, res: Response, next: NextFunction) {
        const id: string = req.params.id;
        const locationId: number = +id;

        if (locationId <=0){
            res.sendStatus(400);
            return;
        }
        const data: LocationModel|null|IErrorResponse = await this.locationService.getById(locationId);
        if(data === null){
            res.sendStatus(404);
            return;
        } 

       res.status(500).send(data);
       
    }
}

export default LocationController;