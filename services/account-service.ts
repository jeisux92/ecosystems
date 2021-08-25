import { Inject, Service } from 'typedi';
import Account from '../models/account';
import AccountRepository from '../repositories/account-repository';
import IAccountViewModel from '../viewModels/accountViewModel';

@Service()
export default class AccountService {
    @Inject() private readonly accountRepository: AccountRepository

    async getAccountsByClientAsync(userId: number): Promise<IAccountViewModel[]> {
        const accounts = await this.accountRepository.getByUserIdAsync(userId)
        return accounts.map((x: Account) => ({
            account: x.getDataValue('account'),
            id: x.getDataValue('id')
        }))
    }

    async createAccountAsync(userId: number, account: string): Promise<void> {
        try {

            const accountToSave: Account = Account.build({ account, UserId: userId })
            await this.accountRepository.createAsync(accountToSave);

        } catch (error) {
            throw error
        }
    }

}

