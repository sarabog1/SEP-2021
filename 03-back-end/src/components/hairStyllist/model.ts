import IModel from "../../common/IModel.interface";
import SalonModel from '../salon/model';

class StyllistModel implements IModel {
    hairStyllistId: number;
    name: string;
    surname: string;
    salonId: number;
    salon: SalonModel;
}

export default StyllistModel;