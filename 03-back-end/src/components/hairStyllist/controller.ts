import { Response, Request, NextFunction } from "express";
import StyllistService from "./service";
import StyllistModel from './model';

class StyllistController{
    private styllistService: StyllistService;

    constructor(styllistService: StyllistService) {
        this.styllistService = styllistService;
    }

    public async getById(req: Request, res: Response, next: NextFunction){
        const id: string = req.params.id;

        const hairStyllistId: number = +id;

        if (hairStyllistId <= 0){
            res.sendStatus(400);
            return;
        }

        const result =await this.styllistService.getById(hairStyllistId);

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
        res.send(await this.styllistService.getAllBySalonId(salonId));
    
    }
    
    }


export default StyllistController;