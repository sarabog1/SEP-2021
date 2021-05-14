import SalonModel from "./model";


class SalonService{
    public async getAll(): Promise<SalonModel[]> {
        const lista:SalonModel[] = [];

        lista.push({
            salonId: 1,
            name: "Ime salona",
            locationId: 1,
        });
        lista.push({
            salonId: 2,
            name: "Ime salona2",
            locationId: 2,
        });

        return lista;
    }
    public async getById(salonId: number): Promise<SalonModel|null>{
        if (salonId === 1 || salonId === 2){
            if (salonId === 1){
                return {
                    salonId: 1,
                    name: "Ime salona",
                    locationId: 1,
                };
            }
            if(salonId === 2){
                return {
                    salonId: 2,
                    name: "Ime salona2",
                    locationId: 2,
                };
            }
        else{
            return null;
        }
            
        }
    }

}
export default SalonService;