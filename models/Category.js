const { DataTypes } = require("sequelize");


// category model, sequelize provides auto incremental primary key
module.exports = (sequelize, DataTypes) => {


    const Category = sequelize.define("Category",{

    name:{
        type: DataTypes.STRING,
        allowNull: false
    }


}, {

    tableName: 'Categories'

    });


    // category has many Posts
    Category.associate = models => {
        Category.hasMany(models.Post, {
             onDelete: 'cascade'
        });
    }

    return Category;
};