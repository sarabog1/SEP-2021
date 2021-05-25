import IApplicationResorces from './IApplicationResorces.interface';
import IServices from './IService.interface';
export default abstract class BaseController {
    private resources: IApplicationResorces;

    constructor(resources: IApplicationResorces){

        this.resources = resources;
    }
    protected get services(): IServices {
        return this.resources.services;
    }
}