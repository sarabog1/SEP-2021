
import {Request, Response, NextFunction} from "express";
import BaseController from '../../common/BaseController';
import { IAddAppointment, IAddAppointmentValidator } from "./dto/AddApointment";


class AppointmentController extends BaseController{
    

    async getAll(req: Request, res: Response, next: NextFunction) {
        const appointment = await this.services.appointmentService.getAll({
            loadAvailable: true,
            loadCustomer: true
        });

        res.send(appointment);
    }
   
    async add(req: Request, res:Response, next: NextFunction){
        const data = req.body;

        if(!IAddAppointmentValidator(data)){
            res.status(400).send(IAddAppointmentValidator.errors);
            return;
        }

        
       const result = await this.services.appointmentService.add(data as IAddAppointment);
        
       res.send(result);
    }

    

    async deleteById(req: Request, res:Response, next: NextFunction){
        const id: string = req.params.id;

        const appointmentId: number = +id;

        if (appointmentId <= 0){
            res.status(400).send("Inavild ID number");
            return;
        }

        res.send(await this.services.availableService.delete(appointmentId));
    }
}

export default AppointmentController;