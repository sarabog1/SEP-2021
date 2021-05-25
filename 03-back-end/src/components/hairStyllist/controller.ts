import { Response, Request, NextFunction } from "express";
import StyllistService from "./service";
import StyllistModel from './model';
import { IAddStyllist, IAddStyllistValidator } from "./dto/AddStyllist";
import { IEditStyllist, IEditStyllistValidator } from "./dto/EditStyllist";
import BaseController from '../../common/BaseController';

class StyllistController extends BaseController{
   

    public async getById(req: Request, res: Response, next: NextFunction){
        const id: string = req.params.id;

        const hairStyllistId: number = +id;

        if (hairStyllistId <= 0){
            res.sendStatus(400);
            return;
        }

        const result =await this.services.styllistService.getById(hairStyllistId);

        if(result === null){
            res.sendStatus(404);
            return;

        }

        if (result instanceof StyllistModel){
            res.send(result);
            return;
        }

        res.status(500).send(result)
    }
    public async getAllInSalon(req: Request, res: Response, next: NextFunction) {
        const salonId: number = +(req.params.cid);
        res.send(await this.services.styllistService.getAllBySalonId(salonId));
    
    }

    async add(req: Request, res:Response){
        const data = req.body;

        if(!IAddStyllistValidator(data)){
            res.status(400).send(IAddStyllistValidator.errors);
            return;
        }

        
       const result = await this.services.styllistService.add(data as IAddStyllist);
        
       res.send(result);
    }
    
    public async edit(req: Request, res: Response){
        const hairStyllistId = +(req.params.id);

        if (hairStyllistId <= 0){
            res.sendStatus(400);
            return;
        }

        if(!IEditStyllistValidator(req.body)){
            res.status(400).send(IEditStyllistValidator.errors);
            return;
        }

        const result = await this.services.styllistService.getById(hairStyllistId)

        if(result === null){
            res.sendStatus(404);
            return;
        }

        if (!(result instanceof StyllistModel)) {
            res.status(500).send(result);
            return;
        }

        

       res.send(await this.services.styllistService.edit(hairStyllistId, req.body as IEditStyllist));
        

    }
    async deleteById(req: Request, res:Response, next: NextFunction){
        const id: string = req.params.id;

        const hairStyllistId: number = +id;

        if (hairStyllistId <= 0){
            res.status(400).send("Inavild ID number");
            return;
        }

        res.send(await this.services.styllistService.delete(hairStyllistId));
    }

       
        
    }


export default StyllistController;