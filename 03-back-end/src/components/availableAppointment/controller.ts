
import {Request, Response, NextFunction} from "express";
import LocationModel from './model';
import IErrorResponse from '../../common/IError.interface';
import BaseController from '../../common/BaseController';
import { IEditAvailable, IEditAvailableValidator } from "./dto/EditAvailable";
import { IAddAvailable, IAddAvailableValidator } from "./dto/AddAvailable";

class AvailableController extends BaseController{
    

    async getAll(req: Request, res: Response, next: NextFunction) {
        const locations = await this.services.availableService.getAll();

        res.send(locations);
    }
    async getById(req: Request, res: Response, next: NextFunction) {
        const id: string = req.params.id;
        const availableId: number = +id;

        if (availableId <=0){
            res.sendStatus(400);
            return;
        }
        const data: LocationModel|null|IErrorResponse = await this.services.availableService.getById(availableId);
        if(data === null){
            res.sendStatus(404);
            return;
        } 

       res.status(500).send(data);
       
    }


   public async getAllByStyllist(req: Request, res: Response, next: NextFunction) {
       const hairStyllistId: number = +(req.params.cid);
        res.send(await this.services.availableService.getAllByStyllist(hairStyllistId));
    
    }
    async add(req: Request, res:Response, next: NextFunction){
        const data = req.body;

        if(!IAddAvailableValidator(data)){
            res.status(400).send(IAddAvailableValidator.errors);
            return;
        }

        
       const result = await this.services.availableService.add(data as IAddAvailable);
        
       res.send(result);
    }

    public async edit(req: Request, res: Response){
        const availableId = +(req.params.id);

        if (availableId <= 0){
            res.sendStatus(400);
            return;
        }

        if(!IEditAvailableValidator(req.body)){
            res.status(400).send(IEditAvailableValidator.errors);
            return;
        }

        const result = await this.services.availableService.getById(availableId)

        if(result === null){
            res.sendStatus(404);
            return;
        }

        if (!(result instanceof LocationModel)) {
            res.status(500).send(result);
            return;
        }

        

       res.send(await this.services.availableService.edit(availableId, req.body as IEditAvailable));
        

    }

    async deleteById(req: Request, res:Response, next: NextFunction){
        const id: string = req.params.id;

        const availableId: number = +id;

        if (availableId <= 0){
            res.status(400).send("Inavild ID number");
            return;
        }

        res.send(await this.services.availableService.delete(availableId));
    }
}

export default AvailableController;