import IBaseRepository from "./base-repository";
import { Service } from 'typedi';
import Transaction from "../models/transaction";
import { Op } from "sequelize";

@Service()
export default class TransactionRepository implements IBaseRepository<Transaction> {

    async getByAccountIdAsync(accountId: number): Promise<Transaction[]> {
        return Transaction.findAll({ where: { AccountId: accountId } });
    }

    async getByAccountIdAndDatesAsync(accountId: number, startDate: string, endDate: string): Promise<Transaction[]> {
        console.log(startDate, endDate)
        return Transaction.findAll({
            where: {
                [Op.and]: {
                    AccountId: accountId,
                    createdAt: {
                        [Op.between]: [
                            // startDate, endDate
                            '2012-04-23T18:25:43.511Z', '2022-04-23T18:25:43.511Z'
                        ]
                    }
                }
            },
            raw: true
        });
    }

    async createAsync(model: Transaction): Promise<void> {
        await model.save()
    }

    async getAllAsync(): Promise<Transaction[]> {
        return await Transaction.findAll()
    }
}