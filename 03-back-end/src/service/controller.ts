import ServiceService from "./service";
import {Request, Response, NextFunction} from "express";
import ServiceModel from './model';
import IErrorResponse from "../common/IError.interface";
import { IAddService, IAddServiceValidator } from "./dto/AddService";
import { IEditService, IEditServiceValidator } from "./dto/EditService";
import { IEditSalon } from "../components/salon/dto/EditSalon";


class ServiceController{
    private serviceService: ServiceService;

    constructor(serviceService: ServiceService) {
        this.serviceService = serviceService;
    }
    async getAll(req: Request, res: Response, next: NextFunction) {
        const salons = await this.serviceService.getAll();

        res.send(salons);
    }
    async getById(req: Request, res: Response, next: NextFunction) {
        const id: string = req.params.id;
        const serviceId: number = +id;

        if (serviceId <=0){
            res.sendStatus(400);
            return;
        }
        const data: ServiceModel|null|IErrorResponse = await this.serviceService.getById(serviceId);
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

        
       const result = await this.serviceService.add(data as IAddService);
        
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

        const result = await this.serviceService.getById(serviceId)

        if(result === null){
            res.sendStatus(404);
            return;
        }

        if (!(result instanceof ServiceModel)) {
            res.status(500).send(result);
            return;
        }

        

       res.send(await this.serviceService.edit(serviceId, req.body as IEditService));
        

    }
    async deleteById(req: Request, res:Response, next: NextFunction){
        const id: string = req.params.id;

        const serviceId: number = +id;

        if (serviceId <= 0){
            res.status(400).send("Inavild ID number");
            return;
        }

        res.send(await this.serviceService.delete(serviceId));
    }

    }

    

 
export default ServiceController;