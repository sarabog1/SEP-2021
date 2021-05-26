import IModel from '../../common/IModel.interface';


class CustomerModel implements IModel {
    customerId: number;
    name: string;
    surname: string;
    phone: number;
   
}

export default CustomerModel;