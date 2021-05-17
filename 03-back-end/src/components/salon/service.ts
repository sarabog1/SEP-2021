import SalonModel from "./model";

import { IAddSalon } from "./dto/AddSalon";
import IErrorResponse from '../../common/IError.interface';
import BaseService from '../../services/BaseService';


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
    
}
export default SalonService;