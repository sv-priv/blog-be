const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("User",{

        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false
        }

}, {

    tableName: 'Users'

    });
    return User;
};