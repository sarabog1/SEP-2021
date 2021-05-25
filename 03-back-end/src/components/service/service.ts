import IErrorResponse from "../common/IError.interface";
import BaseService from "../services/BaseService";
import { IAddService } from "./dto/AddService";
import { IEditService } from "./dto/EditService";
import ServiceModel from './model';

class ServiceService extends BaseService<ServiceModel>{
    

    protected async adaptModel(row: any): Promise<ServiceModel> {
        const item: ServiceModel = new ServiceModel();
        item.serviceId = Number(row?.service_id);
        item.type = row?.type;
        item.price = +(row?.price);       

        return item;
    }

    public async getAll(): Promise<ServiceModel[]|IErrorResponse> {
        return await this.getAllFromTable("service");
        
    }
    public async getById(serviceId: number): Promise<ServiceModel|null|IErrorResponse>{
        return await this.getByIdFromTable("service", serviceId);
        


    }
 
   public async add(data: IAddService): Promise<ServiceModel|IErrorResponse>{
       return new Promise<ServiceModel|IErrorResponse>(async resolve => {
           const sql = "INSERT service SET type = ?, price = ?;";
           this.db.execute(sql, [data.type, data.price])
            .then(async result => {
                const insertInfo: any = result[0];

                const newServiceId: number = +(insertInfo?.insertId);
                resolve(await this.getById(newServiceId));
            })
            .catch(error => resolve({
                errorCode: error?.errno,
                errorMessage: error?.sqlMessage
            }));
       });
   } 
   public async edit(serviceId: number, data: IEditService): Promise<ServiceModel|IErrorResponse>{
    return new  Promise<ServiceModel|IErrorResponse>(resolve => {
        const sql = "UPDATE service SET type = ?, price = ? WHERE service_id = ?;";
        this.db.execute(sql, [ data.type, data.price,  serviceId ])
            .then(async result => {
                resolve(await this.getById(serviceId));
            })
            .catch(error => {
                resolve({
                    errorCode: error?.errno,
                    errorMessage: error?.sqlMessage
                });
            })
        
    });
 }
   public async delete(serviceId: number): Promise<IErrorResponse>{
       return new Promise<IErrorResponse>(resolve => {
           const sql = "DELETE FROM service WHERE service_id = ?;";
           this.db.execute(sql, [serviceId])
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
                        errorMessage: "This salon could not be deleted"   
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
export default ServiceService;