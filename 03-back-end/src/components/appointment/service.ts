import BaseService from "../../common/BaseService";
import IModelAdapterOptions from "../../common/IModelAdapterOptionst.interface";
import AppointmentModel from './model';
import AvailableModel from '../availableAppointment/model';
import CustomerModel from '../customer/model';
import IErrorResponse from "../../common/IError.interface";
import { IAddAppointment } from "./dto/AddApointment";

class AppointmentModelOptions  implements IModelAdapterOptions{
    loadAvailable: true;
    loadCustomer: true;
}

class AppointmentService extends BaseService<AppointmentModel>{
    
    
    protected async adaptModel(data: any, options:Partial<AppointmentModelOptions>):Promise<AppointmentModel>{
        const item: AppointmentModel = new AppointmentModel();

       item.appointmentId = +(data?.appointment_id);
       item.availableAppointmentId = data?.available_appointment_id;
       item.customerId = data?.customer_id;
       item.email = data?.email;
       


        if(options.loadAvailable){
            const result = await this.services.availableService.getById(item.availableAppointmentId);
            item.available = result as AvailableModel;
        }

        if(options.loadCustomer){
            const result = await this.services.customerService.getById(item.customerId);
            item.customer = result as CustomerModel;
        }


        return item;

          

}

public async getAll(options: Partial<AppointmentModelOptions> = { }): Promise<AppointmentModel[]|IErrorResponse>{
    return await this.getAllFromTable("appointment");
}

public async getById(appointmentId: number): Promise<AppointmentModel|null|IErrorResponse>{
    return await this.getByIdFromTable("appointment", appointmentId);
}

    
public async add(data: IAddAppointment): Promise<AppointmentModel|IErrorResponse>{
    return new Promise<AppointmentModel|IErrorResponse>(async resolve => {
        const sql = "INSERT appointment SET available_appointment_id = ?, customer_id = ?, email = ?;";
        this.db.execute(sql, [data.availableAppointmentId, data.customerId, data.email])
         .then(async result => {
             const insertInfo: any = result[0];

             const newAppointmentId: number = +(insertInfo?.insertId);
             resolve(await this.getById(newAppointmentId));
         })
         .catch(error => resolve({
             errorCode: error?.errno,
             errorMessage: error?.sqlMessage
         }));
    });

}


public async delete(appointmentId: number): Promise<IErrorResponse>{
    return new Promise<IErrorResponse>(resolve => {
        const sql = "DELETE FROM appointment WHERE appointment_id = ?;";
        this.db.execute(sql, [appointmentId])
         .then(async result =>{
             const  deleteInfo: any = result[0];
             const deletedRowCount: number = +(deleteInfo?.affectedRows);

             if (deletedRowCount === 1) {
                 resolve({
                     errorCode: 0,
                     errorMessage: "Record deleted"   
                 });
             }
             else {
                 resolve({
                     errorCode: -1,
                     errorMessage: "This location could not be deleted"   
                 })
             }

         })
         .catch(error =>{
             resolve({
                 errorCode: error?.errno,
                 errorMessage: error?.sqlMessage   
             })
         })
    })
}

  



}
export default AppointmentService ;