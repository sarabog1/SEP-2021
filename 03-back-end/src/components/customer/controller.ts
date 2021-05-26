import BaseController from "../../common/BaseController";
import {Request, Response, NextFunction} from "express";
import CustomerModel from './model';
import IErrorResponse from "../../common/IError.interface";
import { IAddCustomer, IAddCustomerValidator } from "./dto/AddCustomer";
import { IEditCustomer, IEditCustomerValidator } from "./dto/EditCustomer";


class CustomerController extends BaseController{
    

    async getAll(req: Request, res: Response, next: NextFunction) {
        const customers = await this.services.customerService.getAll();

        res.send(customers);
    }
    async getById(req: Request, res: Response, next: NextFunction) {
        const id: string = req.params.id;
        const customerId: number = +id;

        if (customerId <=0){
            res.sendStatus(400);
            return;
        }
        const data: CustomerModel|null|IErrorResponse = await this.services.customerService.getById(customerId);
        if(data === null){
            res.sendStatus(404);
            return;
        } 

       res.status(500).send(data);
      
    }
    async add(req: Request, res:Response, next: NextFunction){
        const data = req.body;

        if(!IAddCustomerValidator(data)){
            res.status(400).send(IAddCustomerValidator.errors);
            return;
        }

        
       const result = await this.services.customerService.add(data as IAddCustomer);
        
       res.send(result);
    }

    public async edit(req: Request, res: Response){
        const customerId = +(req.params.id);

        if (customerId <= 0){
            res.sendStatus(400);
            return;
        }

        if(!IEditCustomerValidator(req.body)){
            res.status(400).send(IEditCustomerValidator.errors);
            return;
        }

        const result = await this.services.locationService.getById(customerId)

        if(result === null){
            res.sendStatus(404);
            return;
        }

        if (!(result instanceof CustomerModel)) {
            res.status(500).send(result);
            return;
        }

        

       res.send(await this.services.customerService.edit(customerId, req.body as IEditCustomer));
        

    }

    async deleteById(req: Request, res:Response, next: NextFunction){
        const id: string = req.params.id;

        const customerId: number = +id;

        if (customerId <= 0){
            res.status(400).send("Inavild ID number");
            return;
        }

        res.send(await this.services.customerService.delete(customerId));
    }
}

export default CustomerController;