const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {


    const Category = sequelize.define("Category",{

    name:{
        type: DataTypes.STRING,
        allowNull: false
    }


}, {

    tableName: 'Categories'

    });

    Category.associate = models => {
        Category.hasMany(models.Post, {
             onDelete: 'cascade'
        });
    }

    return Category;
};