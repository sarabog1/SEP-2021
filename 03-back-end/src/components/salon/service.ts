import SalonModel from "./model";

import { IAddSalon } from "./dto/AddSalon";
import IErrorResponse from '../../common/IError.interface';
import BaseService from '../../services/BaseService';
import { IEditSalon } from "./dto/EditSalon";


class SalonService extends BaseService<SalonModel>{
    

    protected async adaptModel(row: any): Promise<SalonModel> {
        const item: SalonModel = new SalonModel();
        item.salonId = Number(row?.salon_id);
        item.name = row?.name;
        item.locationId = +(row?.location_id);
        item.serviceId = +(row?.service_id);


        return item;
    }

    public async getAll(): Promise<SalonModel[]|IErrorResponse> {
        return await this.getAllFromTable("salon");
        
    }
    public async getById(salonId: number): Promise<SalonModel|null|IErrorResponse>{
        return await this.getByIdFromTable("salon", salonId);
        


    }
 
   public async add(data: IAddSalon): Promise<SalonModel|IErrorResponse>{
       return new Promise<SalonModel|IErrorResponse>(async resolve => {
           const sql = "INSERT salon SET name = ?, location_id = ?, service_id = ?;";
           this.db.execute(sql, [data.name, data.locationId, data.serviceId])
            .then(async result => {
                const insertInfo: any = result[0];

                const newSalonId: number = +(insertInfo?.insertId);
                resolve(await this.getById(newSalonId));
            })
            .catch(error => resolve({
                errorCode: error?.errno,
                errorMessage: error?.sqlMessage
            }));
       });
   } 
   public async edit(data: IEditSalon, salonId: number): Promise<SalonModel|null|IErrorResponse>{
    const result = await this.getById(salonId);
    if (result === null) {
        return null;
    }

    if (!(result instanceof SalonModel)) {
        return result;
    }
    return new Promise<SalonModel|IErrorResponse>(async resolve => {
        const sql = "UPDATE salon SET name = ?, location_id = ?, service_id = ? WHERE salon_id = ?;";
        this.db.execute(sql, [data.name, data.locationId, data.serviceId, salonId])
         .then(async result => {
             
             resolve(await this.getById(salonId));
         })
         .catch(error => resolve({
             errorCode: error?.errno,
             errorMessage: error?.sqlMessage
         }));
    })

   }
}
export default SalonService;