import IModel from "../common/IModel.interface";


class ServiceModel implements IModel{
    serviceId: number;
    type: string;
    price: number;
   
}

export default ServiceModel;