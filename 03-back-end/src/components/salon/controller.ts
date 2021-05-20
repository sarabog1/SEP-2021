import SalonService from './service';
import {Request, Response, NextFunction} from "express";
import SalonModel from './model';
import { IAddSalon, IAddSalonValidator } from './dto/AddSalon';
import IErrorResponse from '../../common/IError.interface';
import { IEditSalon, IEditSalonValidator } from './dto/EditSalon';


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
        const data: SalonModel|null|IErrorResponse = await this.salonService.getById(salonId);
        if(data === null){
            res.sendStatus(404);
            return;
        } 

       res.status(500).send(data);
       
    }
    async add(req: Request, res:Response, next: NextFunction){
        const data = req.body;

        if(!IAddSalonValidator(data)){
            res.status(400).send(IAddSalonValidator.errors);
            return;
        }

        
       const result = await this.salonService.add(data as IAddSalon);
        
       res.send(result);
    }
    async edit(req: Request, res:Response, next: NextFunction){
        const id: string = req.params.id;
        const salonId: number = +id;

        if (salonId <= 0) {
            res.status(400).send("Invalid ID number.");
            return;
        }

        const data = req.body;

        if (!IEditSalonValidator(data)){
            res.status(400).send(IEditSalonValidator.errors);
        }

        const result = await this.salonService.edit(data as IEditSalon, salonId);
        

        res.send(result);

    }
    async deleteById(req: Request, res:Response, next: NextFunction){
        const id: string = req.params.id;

        const salonId: number = +id;

        if (salonId <= 0){
            res.status(400).send("Inavild ID number");
            return;
        }

        res.send(await this.salonService.delete(salonId));
    }

    }

    

 
export default SalonController;


