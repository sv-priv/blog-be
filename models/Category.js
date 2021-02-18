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
            //  allowNull: false,
            //  as: 'posts',
             onDelete: 'cascade' // on delete category it will delete all the posts
        });
    }

    return Category;
};