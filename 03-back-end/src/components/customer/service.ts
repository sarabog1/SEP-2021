import BaseService from "../../common/BaseService";
import IErrorResponse from "../../common/IError.interface";
import IModelAdapterOptions from "../../common/IModelAdapterOptionst.interface";
import { IAddCustomer } from "./dto/AddCustomer";
import { IEditCustomer } from "./dto/EditCustomer";
import CustomerModel from './model';



class CustomerService extends BaseService<CustomerModel>{
    protected async adaptModel(data: any):Promise<CustomerModel>{
             const item: CustomerModel = new CustomerModel();

            item.customerId = +(data?.customer_id);
            item.name = data?.name;
            item.surname = data?.surname;
            item.phone = +(data?.phone);

             return item;

             

    }

    public async getAll(): Promise<CustomerModel[]|IErrorResponse>{
        return await this.getAllFromTable("customer");
    }
    public async  getById(customerId: number): Promise<CustomerModel|null|IErrorResponse>{
        
        return await this.getByIdFromTable("customer", customerId);
    }


    public async add(data: IAddCustomer): Promise<CustomerModel|IErrorResponse>{
        return new Promise<CustomerModel|IErrorResponse>(async resolve => {
            const sql = "INSERT customer SET name = ?, surname = ?, phone = ?;";
            this.db.execute(sql, [data.name, data.surname, data.phone])
             .then(async result => {
                 const insertInfo: any = result[0];
 
                 const newId: number = +(insertInfo?.insertId);
                 resolve(await this.getById(newId));
             })
             .catch(error => resolve({
                 errorCode: error?.errno,
                 errorMessage: error?.sqlMessage
             }));
        });
    } 
    
     public async edit(customerId: number, data: IEditCustomer): Promise<CustomerModel|IErrorResponse>{
        return new  Promise<CustomerModel|IErrorResponse>(resolve => {
            const sql = "UPDATE customer SET name = ?, surname = ?, phone = ? WHERE customer_id = ?;";
            this.db.execute(sql, [ data.name, data.surname,  customerId ])
                .then(async result => {
                    resolve(await this.getById(customerId));
                })
                .catch(error => {
                    resolve({
                        errorCode: error?.errno,
                        errorMessage: error?.sqlMessage
                    });
                })
            
        });
     }

     public async delete(customerId: number): Promise<IErrorResponse>{
        return new Promise<IErrorResponse>(resolve => {
            const sql = "DELETE FROM customer WHERE customer_id = ?;";
            this.db.execute(sql, [customerId])
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
                         errorMessage: "This styllist could not be deleted"   
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
        

    }

    export default CustomerService;