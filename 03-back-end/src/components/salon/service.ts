import SalonModel from "./model";
import * as mysql2 from 'mysql2/promise';
import { resolve } from "path";
import { IAddSalon } from "./dto/AddSalon";


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

    public async getAll(): Promise<SalonModel[]> {
        const lista:SalonModel[] = [];

     const sql: string = "SELECT * FROM salon;";
     const [ rows, colums ] = await this.db.execute(sql);

     if (Array.isArray(rows)){
         for(const row of rows){
            lista.push(
                await this.adaptModel(row)
            )
         }
     }


        return lista;
    }
    public async getById(salonId: number): Promise<SalonModel|null>{
        
        const sql: string = "SELECT * FROM salon WHERE salon_id= ? ;";
        const [ rows, colums ] = await this.db.execute(sql, [salonId]);

        if (!Array.isArray(rows)){
            resolve(null);
            return;
        }
        if(rows.length === 0){
            resolve(null);
            return;
        }

        return await this.adaptModel(rows[0])
        


    }
    
    
}
export default SalonService;