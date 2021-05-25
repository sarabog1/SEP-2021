import BaseService from '../../services/BaseService';
import LocationModel from './model';
import IErrorResponse from '../../common/IError.interface';
import { IAddLocation } from './dto/AddLocation';
import { IEditLocation } from './dto/EditLocation';


class LocationService extends BaseService<LocationModel>{
    
    
    protected async adaptModel(data: any):Promise<LocationModel>{
        const item: LocationModel = new LocationModel();

       item.locationId = +(data?.location_id);
       item.street = data?.street;
       item.number = +(data?.number);

        return item;

        

}

public async getAll(): Promise<LocationModel[]|IErrorResponse>{
    return await this.getAllFromTable("location");
}

public async getById(locationId: number): Promise<LocationModel|null|IErrorResponse>{
    return await this.getByIdFromTable("location", locationId);
}
    
public async add(data: IAddLocation): Promise<LocationModel|IErrorResponse>{
    return new Promise<LocationModel|IErrorResponse>(async resolve => {
        const sql = "INSERT location SET street = ?, number = ?;";
        this.db.execute(sql, [data.street, data.number])
         .then(async result => {
             const insertInfo: any = result[0];

             const newLocationId: number = +(insertInfo?.insertId);
             resolve(await this.getById(newLocationId));
         })
         .catch(error => resolve({
             errorCode: error?.errno,
             errorMessage: error?.sqlMessage
         }));
    });

}

public async edit(locationId: number, data: IEditLocation): Promise<LocationModel|IErrorResponse>{
    return new  Promise<LocationModel|IErrorResponse>(resolve => {
        const sql = "UPDATE location SET street = ?, number = ? WHERE location_id = ?;";
        this.db.execute(sql, [ data.street, data.number,  locationId ])
            .then(async result => {
                resolve(await this.getById(locationId));
            })
            .catch(error => {
                resolve({
                    errorCode: error?.errno,
                    errorMessage: error?.sqlMessage
                });
            })
        
    });
 }

   public async delete(locationId: number): Promise<IErrorResponse>{
    return new Promise<IErrorResponse>(resolve => {
        const sql = "DELETE FROM location WHERE location_id = ?;";
        this.db.execute(sql, [locationId])
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
export default LocationService;