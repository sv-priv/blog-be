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

    // post can have only one category, defining one to many relationship with Category model
    Post.associate = models => {
        Post.belongsTo(models.Category, {
            onDelete: 'cascade'
        })
    }
    return Post;
};