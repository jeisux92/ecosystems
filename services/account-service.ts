import { Inject, Service } from 'typedi';
import Account from '../models/account';
import Transaction from '../models/transaction';
import AccountRepository from '../repositories/account-repository';
import TransactionRepository from '../repositories/transaction-repository';
import IAccountViewModel from '../viewModels/accountViewModel';

@Service()
export default class AccountService {
    @Inject() private readonly accountRepository: AccountRepository
    @Inject() private readonly transactionRepository: TransactionRepository

    async getAccountsByClientAsync(userId: number): Promise<IAccountViewModel[]> {
        const accounts = await this.accountRepository.getByUserIdAsync(userId)
        return accounts.map((x: Account) => ({
            account: x.getDataValue('account'),
            id: x.getDataValue('id')
        }))
    }

    async createAccountAsync(userId: number, account: string): Promise<void> {
        const accountToSave: Account = Account.build({ account, UserId: userId })
        await this.accountRepository.createAsync(accountToSave);
    }

    async getAverageByAccountAsync(account: number, startDate: Date, endDate: Date): Promise<number> {
        const transactions: Transaction[] = await this.transactionRepository.getByAccountIdAndDatesAsync(account, startDate, endDate)
        return transactions.reduce((x: number, s: Transaction) => x + s.getDataValue('spend'), 0) / transactions.length

    }
}

