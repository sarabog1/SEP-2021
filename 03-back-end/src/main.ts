import * as express from "express";
import * as cors from "cors";
import Config from "./config/dev";
import SalonRouter from './components/salon/router';
import * as mysql2 from "mysql2/promise"
import IApplicationResorces from './common/IApplicationResorces.interface';
import Router from "./router";
import StyllistRouter from './components/hairStyllist/router';
import LocationRouter from './components/location/router';
import ServiceRouter from './components/service/router';
import SalonService from "./components/salon/service";
import StyllistService from "./components/hairStyllist/service";
import LocationService from "./components/location/service";
import ServiceService from "./components/service/service";
import CustomerService from './components/customer/service';
import CustomerRouter from "./components/customer/router";
import AvailableService from "./components/availableAppointment/service";
import AvailableRouter from "./components/availableAppointment/router";
import AppointmentService from "./components/appointment/service";
import AppointmentRouter from "./components/appointment/router";
import AdminService from './components/admin/service';
import AdminRouter from "./components/admin/router";
import AuthRouter from "./components/auth/router";

async function main() {
    const application: express.Application = express();

    application.use(cors({
        origin: "http://localhost:3000",
        credential: true,
    }));
    application.use(express.json());
 ;

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

    resources.services = {
        salonService: new SalonService(resources),
        styllistService:  new StyllistService(resources),
        locationService:  new LocationService(resources),
        serviceService:  new ServiceService(resources),
        customerService: new CustomerService(resources),
        availableService: new AvailableService(resources),
        appointmentService: new AppointmentService(resources),
        adminService: new AdminService(resources),
    };

    application.use(
        Config.server.static.route,
        express.static(Config.server.static.path, {
            index: Config.server.static.index,
            cacheControl: Config.server.static.cacheControl,
            maxAge: Config.server.static.maxAge,
            etag: Config.server.static.etag,
            dotfiles: Config.server.static.dotfiles,
        }),
    );

    Router.setupRoutes(application, resources, [
        new SalonRouter(),
        new StyllistRouter(),
        new LocationRouter(),
        new ServiceRouter(),
        new CustomerRouter(),
        new AvailableRouter(),
        new AppointmentRouter(),
        new AdminRouter(),
        new AuthRouter()
        // ...
    ]);

    application.use((req, res) => {
        res.sendStatus(404);
    });

    application.use((err, req, res, next) => {
        res.status(err.status).send(err.type);
    });

    application.listen(Config.server.port);
}

main();


