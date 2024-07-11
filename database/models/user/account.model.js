import { DataTypes } from "sequelize";
import sequelize from "../../connection.js";
import User from "./user.model.js";

const Account = sequelize.define('Account', {
    balance: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        minValue:-1000
    }
});
Account.belongsTo(User, { foreignKey: 'user_id' });

sequelize.sync()



export default Account