import IModel from '../../common/IModel.interface';
class SalonModel implements IModel{
    salonId: number;
    name: string;
    locationId: number;
    serviceId: number;
}

export default SalonModel;