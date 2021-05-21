import BaseService from '../../services/BaseService';
import LocationModel from './model';
import IErrorResponse from '../../common/IError.interface';


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
    

}
export default LocationService;