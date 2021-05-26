import BaseService from "../../common/BaseService";
import IErrorResponse from "../../common/IError.interface";
import IModelAdapterOptions from "../../common/IModelAdapterOptionst.interface";
import { IAddAdmin } from "./dto/AddAdmin";
import AdminModel from "./model";
import * as bcrypt from "bcrypt";
import { IEditAdmin } from "./dto/EditAdmin";


class AdminModelAdapterOptions implements IModelAdapterOptions { }

class AdminService extends BaseService<AdminModel> {
    protected async adaptModel(
        data: any,
        options: Partial<AdminModelAdapterOptions>
    ): Promise<AdminModel> {
        const item = new AdminModel();

        item.adminId         = +(data?.admin_id);
        item.username        =   data?.username;
        item.passwordHash    =   data?.password_hash;
        item.isActive        = +(data?.is_active) === 1;

        return item;
    }

    public async getAll(): Promise<AdminModel[]> {
        return await this.getAllFromTable("admin", {}) as AdminModel[];
    }

    public async getById(administratorId: number): Promise<AdminModel|null> {
        return await this.getByIdFromTable("admin", administratorId, {}) as AdminModel|null;
    }

    public async add(data: IAddAdmin): Promise<AdminModel|IErrorResponse> {
        return new Promise<AdminModel|IErrorResponse>(async resolve => {
            // Proveriti password:
            // broj karaktera
            // postojanje A-Z
            // postojanje a-z
            // postojanje 0-9
            // ...
            // ! return resolve({ ... });

            const passwordHash = bcrypt.hashSync(data.password, 11);

            this.db.execute(
                `INSERT admin SET username = ?, password_hash = ?, is_active = 1;`,
                [
                    data.username,
                    passwordHash,
                ]
            )
            .then(async res => {
                const newAdministratorId: number = +((res[0] as any)?.insertId);
                resolve(await this.getById(newAdministratorId));
            })
            .catch(error => {
                resolve({
                    errorCode: error?.errno,
                    errorMessage: error?.sqlMessage
                });
            })
        });
    }

    public async edit(adminId: number, data: IEditAdmin): Promise<AdminModel|IErrorResponse|null> {
        return new Promise<AdminModel|IErrorResponse|null>(async resolve => {
            const currentAdministrator = await this.getById(adminId);

            if (currentAdministrator === null) {
                return resolve(null);
            }

            const passwordHash = bcrypt.hashSync(data.password, 11);

            this.db.execute(
                `UPDATE admin
                 SET password_hash = ?, is_active = ?
                 WHERE admin_id = ?;`,
                [
                    passwordHash,
                    data.isActive ? 1 : 0,
                    adminId,
                ]
            )
            .then(async () => {
                resolve(await this.getById(adminId));
            })
            .catch(error => {
                resolve({
                    errorCode: error?.errno,
                    errorMessage: error?.sqlMessage
                });
            })
        });
    }


    public async delete(adminId: number): Promise<IErrorResponse>{
        return new Promise<IErrorResponse>(resolve => {
            const sql = "DELETE admin WHERE admin_id = ?;";
            this.db.execute(sql, [adminId])
             .then(async result =>{
                 const  deleteInfo: any = result[0];
                 const deletedRowCount: number = +(deleteInfo?.affectedRows);
 
                 if (deletedRowCount === 1) {
                     resolve({
                         errorCode: 0,
                         errorMessage: "Record deleted"   
                     });
                 }
                 else {
                     resolve({
                         errorCode: -1,
                         errorMessage: "This admin could not be deleted"   
                     })
                 }
 
             })
             .catch(error =>{
                 resolve({
                     errorCode: error?.errno,
                     errorMessage: error?.sqlMessage   
                 })
             })
        })
    }

    
    public async getByUsername(username: string): Promise<AdminModel|null> {
        const admins = await this.getAllByFieldName("admin", "username", username, {});

        if (!Array.isArray(admins) || admins.length === 0) {
            return null;
        }

        return admins[0];
    }
}

export default AdminService;
