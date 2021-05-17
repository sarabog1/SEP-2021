import * as express from "express";
import IApplicationResorces from "./IApplicationResorces.interface";

export default interface IRouter{
    setupRoutes(application: express.Application, resources: IApplicationResorces)
};