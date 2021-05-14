import * as mysql2 from "mysql2/promise"

export default interface IApplicationResorces {
    databaseConnection: mysql2.Connection;
    //...
}