import IModel from "../../common/IModel.interface";

class LocationModel implements IModel {
    locationId: number;
    street: string;
    number: number;
}

export default LocationModel;