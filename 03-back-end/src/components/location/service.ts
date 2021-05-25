import BaseService from '../../services/BaseService';
import LocationModel from './model';
import IErrorResponse from '../../common/IError.interface';
import { IAddLocation } from './dto/AddLocation';


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



}
export default LocationService;