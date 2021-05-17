import SalonModel from "./model";
import * as mysql2 from 'mysql2/promise';
import { IAddSalon } from "./dto/AddSalon";
import IErrorResponse from '../../common/IError.interface';


class SalonService{
    private db: mysql2.Connection;
    constructor(db: mysql2.Connection){
        this.db = db;
    }

    protected async adaptModel(row: any): Promise<SalonModel> {
        const item: SalonModel = new SalonModel();
        item.salonId = Number(row?.salon_id);
        item.name = row?.name;
        item.locationId = +(row?.location_id);
        item.serviceId = +(row?.service_id);


        return item;
    }

    public async getAll(): Promise<SalonModel[]|IErrorResponse> {
        return new Promise<SalonModel[]|IErrorResponse>(async(resolve) =>{
            

                const sql: string = "SELECT * FROM salon;";
                this.db.execute(sql)
                    .then(async result => {
                     const rows = result[0];
                        const lista : SalonModel[] = [];  

                     if (Array.isArray(rows)){
                            for(const row of rows){
                                lista.push(
                                    await this.adaptModel(row)
                         )
                    }
                }
                 resolve(lista);
                 })
                .catch(error => {
                    resolve({
                        errorCode: error?.errno,
                        errorMessage: error?.sqlMessage,
                    });
                })



             
             });
        
    }
    public async getById(salonId: number): Promise<SalonModel|null>{
        
        const sql: string = "SELECT * FROM salon WHERE salon_id= ? ;";
        const [ rows, colums ] = await this.db.execute(sql, [salonId]);

        if (!Array.isArray(rows)){
           
            return null;
        }
        if(rows.length === 0){
            
            return null;
        }

        return await this.adaptModel(rows[0])
        


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