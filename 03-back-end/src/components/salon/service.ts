import SalonModel from "./model";
import { IAddSalon } from "./dto/AddSalon";
import IErrorResponse from '../../common/IError.interface';
import BaseService from '../../common/BaseService';
import { IEditSalon } from "./dto/EditSalon";
import IModelAdapterOptions from '../../common/IModelAdapterOptionst.interface';
import LocationModel from '../location/model';
import ServiceModel from '../service/model';
import StyllistModel from '../hairStyllist/model';


class SalonModelAdapterOptions implements IModelAdapterOptions {
   loadLocation: boolean = false;
   loadService: boolean = false;
   loadHairStyllist: boolean = false;
}
class SalonService extends BaseService<SalonModel>{
    

    protected async adaptModel(row: any, options:Partial<SalonModelAdapterOptions>): Promise<SalonModel> {
        const item: SalonModel = new SalonModel();
        item.salonId = Number(row?.salon_id);
        item.name = row?.name;
        item.locationId = +(row?.location_id);
        item.serviceId = +(row?.service_id);

        if (options.loadHairStyllist){
           const result = await this.services.styllistService.getById(item.salonId);
           item.hairStyllist = result as StyllistModel;
        }

        if ( options.loadService && item.serviceId){
            const result = await this.services.serviceService.getById(item.serviceId);
            item.service = result as ServiceModel;
        }

        if (options.loadLocation && item.locationId){
            const result = await this.services.locationService.getById(item.locationId);
            item.location = result as LocationModel;
        }




        return item;
    }

    public async getAll(options: Partial<SalonModelAdapterOptions> = { }): Promise<SalonModel[]|IErrorResponse> {
        return await this.getAllFromTable("salon");
        
    }
    public async getById(salonId: number,options: Partial<SalonModelAdapterOptions> = { }): Promise<SalonModel|null|IErrorResponse>{
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
   public async delete(salonId: number): Promise<IErrorResponse>{
       return new Promise<IErrorResponse>(resolve => {
           const sql = "DELETE FROM salon WHERE salon_id = ?;";
           this.db.execute(sql, [salonId])
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
export default SalonService;