
import {Request, Response, NextFunction} from "express";
import BaseController from '../../common/BaseController';
import IErrorResponse from "../../common/IError.interface";
import { IAddAppointment, IAddAppointmentValidator } from "./dto/AddApointment";
import AppointmentModel from './model';
import * as nodemailer from "nodemailer";
import Config from '../../config/dev';
import { resolve } from "url";


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
    public async sendAppointmentEmail(data: AppointmentModel): Promise<IErrorResponse>{
        return new Promise<IErrorResponse>(async resolve =>{
            const transport = nodemailer.createTransport({
                host: Config.mail.hostname,
                port: Config.mail.port,
                secure: Config.mail.secure,
                auth: {
                    user: Config.mail.username,
                    pass: Config.mail.password,
                },
                debug: Config.mail.debug
            },
            {
                from: Config.mail.fromEmail,
            }
            );

            transport.sendMail({
                to: data.email,
                subject:"Appointment booked",
                html: `
                    <!doctype html>
                    <html>
                        <head>
                            <meta charset="utf-8>
                        
                        </head>
                        <body>
                            <p>
                                Dear ${data.email}<br>
                                Your appointment is booked with the id ${data.appointmentId}.
                            
                            </p>
                        
                        </body>
                    </html>
                `,
            })
            .then(()=>{
                transport.close();

                resolve({
                    errorCode: 0,
                    errorMessage:"",

                })
            })
            .catch(error => {
                transport.close();

                resolve({
                    errorCode: -1,
                    errorMessage: error?.message,
                })
            })
        });
        
        }
    public async bookAppointment(req: Request, res: Response) {
        if (!IAddAppointmentValidator(req.body)) {
            return res.status(400).send(IAddAppointmentValidator.errors);
        }

        const result: AppointmentModel|IErrorResponse = await this.services.appointmentService.add(req.body as IAddAppointment);

        if (!(result instanceof AppointmentModel)) {
            if (result.errorMessage.includes("uq_user_email")) {
                return res.status(400).send("An account with this email already exists.");
            }

            return res.status(400).send(result);
        }

        const mailResult = await this.sendAppointmentEmail(result);

        if (mailResult.errorCode !== 0) {
            // Write down into an error log...
            // Schedule e-mail sending at a later time...
        }

        res.send(result);
    }
}

export default AppointmentController;