import {
    Sequelize,
    Model,
    DataTypes,
} from "sequelize";
import Container, { Service } from "typedi";
let sequelize: Sequelize = Container.get<Sequelize>('db');


class Account extends Model { }

Account.init({
    account: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize, // We need to pass the connection instance
    modelName: 'Account' // We need to choose the model name
});



export default Account
