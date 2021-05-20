import * as mysql2 from "mysql2/promise"
import IServices from "./IService.interface";

export default interface IApplicationResorces {
    databaseConnection: mysql2.Connection;
    services?: IServices;
}