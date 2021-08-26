import express, { Request, Response, NextFunction } from 'express';
import auth from '../middlewares/auth'
import Container from 'typedi';
import AccountService from '../services/account-service';
import IAccountViewModel from '../viewModels/accountViewModel';
import TransactionService from '../services/transaction-service';
import ITransactionViewModel from '../viewModels/transactionViewModel';

const router = express.Router()

router
    .get('/', auth, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userId } = req.user
            let accountService: AccountService = Container.get<AccountService>(AccountService);
            const accounts: IAccountViewModel[] = await accountService.getAccountsByClientAsync(userId)
            res.send(accounts)
        } catch (error) {
            next(error)
        }
    })
    .post('/', auth, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userId } = req.user
            const { account } = req.body;
            if (!account) {
                res.status(400).send("Account required");
            }
            let accountService: AccountService = Container.get<AccountService>(AccountService);
            await accountService.createAccountAsync(userId, account)
            res.status(200).send()
        } catch (error) {
            next(error)
        }
    })

router
    .get('/:accountId', auth, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { accountId } = req.params
            let transactionService: TransactionService = Container.get<TransactionService>(TransactionService);
            const transactions: ITransactionViewModel[] = await transactionService.getTransactionsByAccountIdAsync(accountId)
            res.send(transactions)
        } catch (error) {
            next(error)
        }
    })
    .post('/:accountId', auth, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { accountId } = req.params
            if (!accountId) {
                res.status(400).send("Account Id required");
            }
            const transaction: ITransactionViewModel = { ...req.body }
            console.log('transaction')
            let transactionService: TransactionService = Container.get<TransactionService>(TransactionService);
            await transactionService.createTransactionAsync(accountId, transaction)
            res.status(200).send()
        } catch (error) {
            next(error)
        }
    })

router.get('/:accountId/transactions', auth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { accountId } = req.params
        const { startDate, endDate } = req.query
        let accountService: AccountService = Container.get<AccountService>(AccountService);
        const average: number = await accountService.getAverageByAccountAsync(+accountId, startDate, endDate)
        res.send(average)
    } catch (error) {
        next(error)
    }
})

module.exports = router