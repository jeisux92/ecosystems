import { Inject, Service } from 'typedi';
import Transaction from '../models/transaction';
import TransactionRepository from '../repositories/transaction-repository';
import ITransactionViewModel from '../viewModels/transactionViewModel';

@Service()
export default class TransactionService {
    @Inject() private readonly transactionRepository: TransactionRepository

    async getTransactionsByAccountIdAsync(accountId: number): Promise<ITransactionViewModel[]> {
        const transactions = await this.transactionRepository.getByAccountIdAsync(accountId)
        console.log(transactions)
        return transactions.map((x: Transaction) => ({
            description: x.getDataValue('description'),
            spend: x.getDataValue('spend')
        }))
    }

    async createTransactionAsync(accountId: number, transaction: ITransactionViewModel): Promise<void> {
        try {

            const transacionToSave: Transaction = Transaction.build({ ...transaction, AccountId: accountId })
            await this.transactionRepository.createAsync(transacionToSave);

        } catch (error) {
            throw error
        }
    }

}

