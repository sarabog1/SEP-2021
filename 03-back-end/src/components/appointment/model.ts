import IModel from '../../common/IModel.interface';
import AvailableModel from '../availableAppointment/model';
import CustomerModel from '../customer/model';
class AppointmentModel implements IModel{
        appointmentId: number;
        availableAppointmentId: number;
        customerId: number;
        available: AvailableModel;
        customer: CustomerModel;
}
export default AppointmentModel;