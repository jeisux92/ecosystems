import IBaseRepository from "./base-repository";
import { Service } from 'typedi';
import Transaction from "../models/transaction";
import { Op } from "sequelize";

@Service()
export default class TransactionRepository implements IBaseRepository<Transaction> {
    constructor() {

    }
    async getByAccountIdAsync(accountId: number): Promise<Transaction[]> {
        return Transaction.findAll({ where: { AccountId: accountId } });
    }

    async getByAccountIdAndDatesAsync(accountId: number, startDate: Date, endDate: Date): Promise<Transaction[]> {
        return Transaction.findAll({
            where: {
                [Op.and]: {
                    AccountId: accountId,
                    createdAt: {
                        [Op.between]: [startDate, endDate]
                    }
                }
            }
        });
    }

    async createAsync(model: Transaction): Promise<void> {
        await model.save()
    }

    async getAllAsync(): Promise<Transaction[]> {
        return await Transaction.findAll()
    }
}