import * as express from "express";
import * as cors from "cors";
import Config from "./config/dev";
import SalonService from './components/salon/service';
import SalonController from './components/salon/controller';
import SalonModel from "./components/salon/model";
const application: express.Application = express();

application.use(cors());
application.use(express.json());

application.use(
    Config.server.static.route, express.static(Config.server.static.path, {
    index: Config.server.static.index,
    cacheControl: Config.server.static.cacheControl,
    maxAge: Config.server.static.maxAge,
    etag: Config.server.static.etag,
    dotfiles: Config.server.static.dotfiles,
    
    }),
);
const salonService: SalonService= new SalonService();
const salonController: SalonController= new SalonController(salonService);

application.get("/salon", salonController.getAll.bind(salonController));
application.get("/salon/:id", salonController.getById.bind(salonController))

application.use((req, res)=>{
    res.sendStatus(404);
});

application.listen(Config.server.port);
