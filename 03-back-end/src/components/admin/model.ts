import IModel from '../../common/IModel.interface';
export default class AdminModel implements IModel{
    adminId: number;
    username: string;
    passwordHash: string;
    isActive: boolean;
}
