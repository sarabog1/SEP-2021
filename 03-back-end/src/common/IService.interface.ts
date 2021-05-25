import SalonService from "../components/salon/service";
import StyllistService from "../components/hairStyllist/service";
import LocationService from '../components/location/service';
import ServiceService from '../components/service/service';

export default interface IServices {
    salonService: SalonService;
    styllistService: StyllistService;
    locationService: LocationService;
    serviceService: ServiceService;
}