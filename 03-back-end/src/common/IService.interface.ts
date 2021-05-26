import SalonService from "../components/salon/service";
import StyllistService from "../components/hairStyllist/service";
import LocationService from '../components/location/service';
import ServiceService from '../components/service/service';
import CustomerService from '../components/customer/service';
import AvailableService from "../components/availableAppointment/service";
import AppointmentService from "../components/appointment/service";

export default interface IServices {
    salonService: SalonService;
    styllistService: StyllistService;
    locationService: LocationService;
    serviceService: ServiceService;
    customerService: CustomerService;
    availableService: AvailableService;
    appointmentService: AppointmentService;
}