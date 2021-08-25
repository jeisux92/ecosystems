import {
    Sequelize,
    Model,
    DataTypes,
} from "sequelize";
import Container from "typedi";
let sequelize: Sequelize = Container.get<Sequelize>('db');


class Transaction extends Model { }

Transaction.init({
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    spend: {
        type: DataTypes.NUMBER,
        allowNull: false
    }
}, {
    sequelize, // We need to pass the connection instance
    modelName: 'Transaction' // We need to choose the model name
});



export default Transaction
