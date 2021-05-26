import BaseService from "../../common/BaseService";
import AvailableModel from './model';
import IModelAdapterOptions from '../../common/IModelAdapterOptionst.interface';
import StyllistModel from "../hairStyllist/model";
import IErrorResponse from "../../common/IError.interface";
import { IAddAvailable } from "./dto/AddAvailable";
import { IEditAvailable } from "./dto/EditAvailable";

class AvailableModelOptions implements IModelAdapterOptions{
    loadHaiststyllist: false;
}

class AvailableService extends BaseService<AvailableModel>{
    
    
    protected async adaptModel(data: any, options:Partial<AvailableModelOptions>):Promise<AvailableModel>{
        const item: AvailableModel = new AvailableModel();

       item.availableId = +(data?.available_appointment_id);
       item.startsAt = data?.starts_at;
       item.endAt = data?.end_at;
       item.isAvailable = data?.is_available;
       item.hairStyllistId = data?.hair_styllist_id;


        if(item.hairStyllist){
            const result = await this.services.styllistService.getById(item.hairStyllistId);
            item.hairStyllist = result as StyllistModel;
        }

        return item;

        

}

public async getAll(): Promise<AvailableModel[]|IErrorResponse>{
    return await this.getAllFromTable("available_appointment");
}

public async getById(availableId: number): Promise<AvailableModel|null|IErrorResponse>{
    return await this.getByIdFromTable("available_appointment", availableId);
}

public async getAllByStyllist(hairStyllistId: number): Promise<AvailableModel[]|IErrorResponse>{
return await this.getAllByFieldName("available_appointment", "hair_styllist_id", hairStyllistId);
}
    
public async add(data: IAddAvailable): Promise<AvailableModel|IErrorResponse>{
    return new Promise<AvailableModel|IErrorResponse>(async resolve => {
        const sql = "INSERT available_appointment SET starts_at = ?, end_at = ?, is_available = ?, hair_styllist_id = ?;";
        this.db.execute(sql, [data.startsAt, data.endAt, data.isAvailable, data.hairStyllistId])
         .then(async result => {
             const insertInfo: any = result[0];

             const newAvailableId: number = +(insertInfo?.insertId);
             resolve(await this.getById(newAvailableId));
         })
         .catch(error => resolve({
             errorCode: error?.errno,
             errorMessage: error?.sqlMessage
         }));
    });

}

public async edit(availableId: number, data: IEditAvailable): Promise<AvailableModel|IErrorResponse>{
    return new  Promise<AvailableModel|IErrorResponse>(resolve => {
        const sql = "UPDATE available_appointment SET is_available = ? WHERE available_appointment_id = ?;";
        this.db.execute(sql, [ data.isAvailable, availableId ])
            .then(async result => {
                resolve(await this.getById(availableId));
            })
            .catch(error => {
                resolve({
                    errorCode: error?.errno,
                    errorMessage: error?.sqlMessage
                });
            })
        
    });
 }

   public async delete(availableId: number): Promise<IErrorResponse>{
    return new Promise<IErrorResponse>(resolve => {
        const sql = "DELETE FROM available_appointment WHERE available_appointment_id = ?;";
        this.db.execute(sql, [availableId])
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
export default AvailableService;