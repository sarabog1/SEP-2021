import SalonModel from '../../../03-back-end/src/components/salon/model';
import api from '../api/api';

export default class SalonService {
    public static getAllSalons(): Promise<SalonModel[]> {
        return new Promise<SalonModel[]>(resolve => {
            api(
                "get",
                "/salon",
                "viewver"
            )
            .then(res => {
                if (res?.status !== "ok"){
                    // emit event
                  return resolve([]);
                }


                resolve(res.data as SalonModel[]);
            });
        })

    }
    public static getSalonById(salonId: number): Promise<SalonModel|null> {
        return new Promise<SalonModel|null>(resolve => {
            api(
                "get",
                "/salon" + salonId,
                "viewver"
            )
            .then(res => {
                if (res?.status !== "ok"){
                    // emit event
                  return resolve(null);
                }


                resolve(res.data as SalonModel);
            });
        })

    }

}