import ServiceService from "./service";
import {Request, Response, NextFunction} from "express";
import ServiceModel from './model';
import IErrorResponse from "../../common/IError.interface";
import { IAddService, IAddServiceValidator } from "./dto/AddService";
import { IEditService, IEditServiceValidator } from "./dto/EditService";
import BaseController from '../../common/BaseController';


class ServiceController extends BaseController{
    
    async getAll(req: Request, res: Response, next: NextFunction) {
        const salons = await this.services.serviceService.getAll();

        res.send(salons);
    }
    async getById(req: Request, res: Response, next: NextFunction) {
        const id: string = req.params.id;
        const serviceId: number = +id;

        if (serviceId <=0){
            res.sendStatus(400);
            return;
        }
        const data: ServiceModel|null|IErrorResponse = await this.services.serviceService.getById(serviceId);
        if(data === null){
            res.sendStatus(404);
            return;
        } 

       res.status(500).send(data);
       
    }
    async add(req: Request, res:Response, next: NextFunction){
        const data = req.body;

        if(!IAddServiceValidator(data)){
            res.status(400).send(IAddServiceValidator.errors);
            return;
        }

        
       const result = await this.services.serviceService.add(data as IAddService);
        
       res.send(result);
    }
    public async edit(req: Request, res: Response){
        const serviceId = +(req.params.id);

        if (serviceId <= 0){
            res.sendStatus(400);
            return;
        }

        if(!IEditServiceValidator(req.body)){
            res.status(400).send(IEditServiceValidator.errors);
            return;
        }

        const result = await this.services.serviceService.getById(serviceId)

        if(result === null){
            res.sendStatus(404);
            return;
        }

        if (!(result instanceof ServiceModel)) {
            res.status(500).send(result);
            return;
        }

        

       res.send(await this.services.serviceService.edit(serviceId, req.body as IEditService));
        

    }
    async deleteById(req: Request, res:Response, next: NextFunction){
        const id: string = req.params.id;

        const serviceId: number = +id;

        if (serviceId <= 0){
            res.status(400).send("Inavild ID number");
            return;
        }

        res.send(await this.services.serviceService.delete(serviceId));
    }

    }

    

 
export default ServiceController;