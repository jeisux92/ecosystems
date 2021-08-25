import Account from "./account";
import Transaction from "./transaction";
import User from "./user";

export default async () => {
    Account.belongsTo(User);
    Transaction.belongsTo(Account);

    await User.sync({ force: true })
    await Account.sync({ force: true })
    await Transaction.sync({ force: true })
}