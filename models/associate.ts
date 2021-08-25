import Account from "./account";
import Transaction from "./transaction";
import User from "./user";

export default async () => {
    Account.belongsTo(User);
    Transaction.belongsTo(Account);

    User.sync({ force: true })
    Account.sync({ force: true })
    Transaction.sync({ force: true })
}