import Account from "../models/account";
import IBaseRepository from "./base-repository";
import { Service } from 'typedi';

@Service()
export default class AccountRepository implements IBaseRepository<Account> {
    
    async getByUserIdAsync(userId: number): Promise<Account[]> {
        const response: any = await Account.findAll({ where: { userId } });
        return response
    }

    async createAsync(model: Account): Promise<void> {
        await model.save()
    }


    getAllAsync(): Promise<Account[]> {
        return Account.findAll()
    } 
}