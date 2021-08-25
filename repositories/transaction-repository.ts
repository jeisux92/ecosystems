import IBaseRepository from "./base-repository";
import { Service } from 'typedi';
import Transaction from "../models/transaction";

@Service()
export default class TransactionRepository implements IBaseRepository<Transaction> {
    constructor() {

    }
    async getByAccountIdAsync(accountId: number): Promise<Transaction[]> {
        console.log(await this.getAllAsync())
        return Transaction.findAll({ where: { AccountId: accountId } });
    }

    async createAsync(model: Transaction): Promise<void> {
        await model.save()
    }

    async getAllAsync(): Promise<Transaction[]> {
        return await Transaction.findAll()
    }
}