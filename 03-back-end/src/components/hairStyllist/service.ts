import BaseService from '../../common/BaseService';
import StyllistModel from './model';
import IModelAdapterOptions from '../../common/IModelAdapterOptionst.interface';
import SalonService from '../salon/service';
import * as mysql2 from "mysql2/promise";
import SalonModel from '../salon/model';
import IErrorResponse from '../../common/IError.interface';
import { IAddStyllist } from './dto/AddStyllist';
import { IEditStyllist } from './dto/EditStyllist';

class StyllistModelAdapterOptions implements IModelAdapterOptions{
    loadSalon: boolean = false;
}

class StyllistService extends BaseService<StyllistModel>{
    protected async adaptModel(data: any, options:Partial<StyllistModelAdapterOptions>):Promise<StyllistModel>{
             const item: StyllistModel = new StyllistModel();

            item.hairStyllistId = +(data?.hair_styllist_id);
            item.name = data?.name;
            item.surname = data?.surname;
            item.salonId = +(data?.salon_id);

            if (options.loadSalon && item.salonId){
                const result = await this.services.salonService.getById(item.salonId);
                item.salon = result as SalonModel;
            }

            

             return item;

             

    }
    public async  getById(hairStyllistId: number): Promise<StyllistModel|null|IErrorResponse>{
        
        return await this.getByIdFromTable("hair_styllist", hairStyllistId);
    }

    public async getAllBySalonId(salonId: number
        ): Promise<StyllistModel[]|IErrorResponse> {
            const result1 = await this.getAllByFieldName("hair_styllist","salon_id", salonId);
           
            return result1;
            
    }

    public async add(data: IAddStyllist): Promise<StyllistModel|IErrorResponse>{
        return new Promise<StyllistModel|IErrorResponse>(async resolve => {
            const sql = "INSERT hair_styllist SET name = ?, surname = ?, salon_id = ?;";
            this.db.execute(sql, [data.name, data.surname, data.salonId])
             .then(async result => {
                 const insertInfo: any = result[0];
 
                 const newId: number = +(insertInfo?.insertId);
                 resolve(await this.getById(newId));
             })
             .catch(error => resolve({
                 errorCode: error?.errno,
                 errorMessage: error?.sqlMessage
             }));
        });
    } 
    
     public async edit(hairStyllistId: number, data: IEditStyllist): Promise<StyllistModel|IErrorResponse>{
        return new  Promise<StyllistModel|IErrorResponse>(resolve => {
            const sql = "UPDATE hair_styllist SET name = ?, surname = ? WHERE hair_styllist_id = ?;";
            this.db.execute(sql, [ data.name, data.surname,  hairStyllistId ])
                .then(async result => {
                    resolve(await this.getById(hairStyllistId));
                })
                .catch(error => {
                    resolve({
                        errorCode: error?.errno,
                        errorMessage: error?.sqlMessage
                    });
                })
            
        });
     }

     public async delete(hairStyllistId: number): Promise<IErrorResponse>{
        return new Promise<IErrorResponse>(resolve => {
            const sql = "DELETE FROM hair_styllist WHERE hair_styllist_id = ?;";
            this.db.execute(sql, [hairStyllistId])
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
                         errorMessage: "This styllist could not be deleted"   
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
    

    
    


export default StyllistService;