import * as express from "express";
import * as cors from "cors";
import Config from "./config/dev";
import SalonRouter from './components/salon/router';
import * as mysql2 from "mysql2/promise"
import IApplicationResorces from './common/IApplicationResorces.interface';
import Router from "./router";

async function main() {
    const application: express.Application = express();

application.use(cors());
application.use(express.json());

const resources: IApplicationResorces = {
    databaseConnection: await mysql2.createConnection({
        host: Config.database.host,
        port: Config.database.port,
        user: Config.database.user,
        password: Config.database.password,
        database: Config.database.database,
        charset: Config.database.charset,
        timezone: Config.database.timezone,
        supportBigNumbers: true,
    }),
}

resources.databaseConnection.connect();
application.use(
    Config.server.static.route, express.static(Config.server.static.path, {
    index: Config.server.static.index,
    cacheControl: Config.server.static.cacheControl,
    maxAge: Config.server.static.maxAge,
    etag: Config.server.static.etag,
    dotfiles: Config.server.static.dotfiles,
    
    }),
);
Router.setupRoutes(application, resources, [
   new SalonRouter(),
]);


application.use((req, res)=>{
    res.sendStatus(404);
});

application.use((err, req, res, next) => {
    res.status(err.status).send(err.type);
})
application.listen(Config.server.port);
}
main();


