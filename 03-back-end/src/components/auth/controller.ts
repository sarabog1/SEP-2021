import BaseController from '../../common/BaseController';
import {Request, Response} from "express";
import { IAdminlogin, IAdminloginValidator } from './dto/AdminLogin';
import * as bcrypt from "bcrypt";
import ITokenData from './dto/ITokenData.interface';
import * as jwt from "jsonwebtoken";
import Config from '../../config/dev';


export default class AuthController extends BaseController{
    public async adminLogin(req: Request, res: Response) {
        if (!IAdminloginValidator(req.body)) {
            return res.status(400).send(IAdminloginValidator.errors);
        }

        const data = req.body as IAdminlogin;

        const admin = await this.services.adminService.getByUsername(data.username);
        
        if (admin === null) return res.sendStatus(404);

        if (!admin.isActive) {
            return res.status(403).send("admin account inactive.");
        }

        if (!bcrypt.compareSync(data.password, admin.passwordHash)) {
            // Anti-brute-force mera: sacekati 1s pre slanja odgovora da lozinka nije dobra
            await new Promise(resolve => setTimeout(resolve, 1000));
            return res.status(403).send("Invalid admin password.");
        }

        const authTokenData: ITokenData = {
            id: admin.adminId,
            identity: admin.username,
            role: "admin",
        };

        const refreshTokenData: ITokenData = {
            id: admin.adminId,
            identity: admin.username,
            role: "admin",
        };

        const authToken = jwt.sign(
            authTokenData,
            Config.auth.admin.auth.private,
            {
                algorithm: Config.auth.admin.algorithm,
                issuer: Config.auth.admin.issuer,
                expiresIn: Config.auth.admin.auth.duration,
            },
        );

        const refreshToken = jwt.sign(
            refreshTokenData,
            Config.auth.admin.refresh.private,
            {
                algorithm: Config.auth.admin.algorithm,
                issuer: Config.auth.admin.issuer,
                expiresIn: Config.auth.admin.refresh.duration,
            },
        );

        res.send({
            authToken: authToken,
            refreshToken: refreshToken,
        });
    }
 }
