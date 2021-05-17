import SalonService from './service';
import {Request, Response, NextFunction} from "express";
import SalonModel from './model';

class SalonController{
    private salonService: SalonService;

    constructor(salonService: SalonService) {
        this.salonService = salonService;
    }
    async getAll(req: Request, res: Response, next: NextFunction) {
        const salons = await this.salonService.getAll();

        res.send(salons);
    }
    async getById(req: Request, res: Response, next: NextFunction) {
        const id: string = req.params.id;
        const salonId: number = +id;

        if (salonId <=0){
            res.sendStatus(400);
            return;
        }
        const data: SalonModel|null = await this.salonService.getById(salonId);
        if(data === null){
            res.sendStatus(404);
            return;
        } 

       res.status(500).send(data);
       
    }
    
}
export default SalonController;