import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../../connection.js";
import Account from "./account.model.js";

const Transaction = sequelize.define('Transaction', {
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    transaction_date: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
});

Transaction.belongsTo(Account, { foreignKey: 'account_id' });

sequelize.sync()

export default Transaction