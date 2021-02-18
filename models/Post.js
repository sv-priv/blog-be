const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {


    const Post = sequelize.define("Post",{

    title:{
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING(300),
        allowNull: false,

    }
}, {

    tableName: 'Posts'

    });

    Post.associate = models => {
        Post.belongsTo(models.Category, {
            onDelete: 'cascade'
            // foreignKey : 'categoryId',
            // as: 'category'
        })
    }
    return Post;
};