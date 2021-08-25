import {
    Sequelize,
    Model,
    DataTypes,
} from "sequelize"; import Container, { Service } from "typedi";
let sequelize: Sequelize = Container.get<Sequelize>('db');


class User extends Model {
}

User.init({
    id: {
        type: DataTypes.NUMBER,
        allowNull: false,
        primaryKey: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize, // We need to pass the connection instance
    modelName: 'User' // We need to choose the model name
});


export default User
