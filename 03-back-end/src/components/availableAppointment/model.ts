import IModel from '../../common/IModel.interface';
import StyllistModel from '../hairStyllist/model';


class AvailableModel implements IModel{
    availableAppointmentId: number;
    startsAt: Date;
    endAt: Date;
    isAvailable: boolean;
    hairStyllistId: number;
    hairStyllist: StyllistModel;

}
export default AvailableModel;