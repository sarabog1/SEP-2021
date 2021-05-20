import BaseService from '../../services/BaseService';
import StyllistModel from './model';
import IModelAdapterOptions from '../../common/IModelAdapterOptionst.interface';
import SalonService from '../salon/service';
import * as mysql2 from "mysql2/promise";
import SalonModel from '../salon/model';
import IErrorResponse from '../../common/IError.interface';

class StyllistModelAdapterOptions implements IModelAdapterOptions{
    loadSalon: boolean = false;
}

class StyllistService extends BaseService<StyllistModel>{

    private salonService: SalonService;

    constructor(db: mysql2.Connection) {
        super(db);

        this.salonService = new SalonService(this.db);
    }

    protected async adaptModel(
        data: any):Promise<StyllistModel>{
             const item: StyllistModel = new StyllistModel();

            item.hairStyllistId = +(data?.hair_styllist_id);
            item.name = data?.name;
            item.surname = data?.surname;
            item.salonId = +(data?.salon_id);

            if (item.salonId){
                const result = await this.salonService.getById(item.salonId);
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
        

    }
    

    
    


export default StyllistService;