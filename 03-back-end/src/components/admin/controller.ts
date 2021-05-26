import BaseController from '../../common/BaseController';
import {Request, Response, NextFunction} from "express";
import { IAddAdmin, IAddAdminrValidator } from './dto/AddAdmin';
import { IEditAdmin, IEditAdminValidator } from './dto/EditAdmin';

export default class AdministratorController extends BaseController {
    public async getAll(req: Request, res: Response) {
        res.send(await this.services.adminService.getAll());
    }

    public async getById(req: Request, res: Response) {
        const id = +(req.params.id);

        if (id <= 0) return res.status(400).send("The ID value cannot be smaller than 1.");

        const item = await this.services.adminService.getById(id);

        if (item === null) return res.sendStatus(404);

        res.send(item);
    }

    public async add(req: Request, res: Response) {
        if (!IAddAdminrValidator(req.body)) {
            return res.status(400).send(IAddAdminrValidator.errors);
        }

        const result = await this.services.adminService.add(req.body as IAddAdmin);

        res.send(result);
    }

    public async edit(req: Request, res: Response) {
        const id = +(req.params.id);

        if (id <= 0) return res.status(400).send("The ID value cannot be smaller than 1.");

        if (!IEditAdminValidator(req.body)) {
            return res.status(400).send(IEditAdminValidator.errors);
        }

        const result = await this.services.adminService.edit(id, req.body as IEditAdmin);

        if (result === null) return res.sendStatus(404);

        res.send(result);
    }

    async delete(req: Request, res:Response, next: NextFunction){
        const id: string = req.params.id;

        const adminId: number = +id;

        if (adminId <= 0){
            res.status(400).send("Inavild ID number");
            return;
        }

        res.send(await this.services.adminService.delete(adminId));
    }
}