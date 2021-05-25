import IModel from '../../common/IModel.interface';
import LocationModel from '../location/model';
import ServiceModel from '../service/model';
import StyllistModel from '../hairStyllist/model';
class SalonModel implements IModel{
    salonId: number;
    name: string;
    locationId: number;
    serviceId: number;
    location: LocationModel;
    service: ServiceModel;
    hairStyllist: StyllistModel;
}

export default SalonModel;