const { Model, Datatypes } = require('sequelize');

class Post extends Model {}

Post.init (
    // define Post model columns
    {
        id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },

        title: {
            type: Datatypes.STRING,
            allowNull: false
        },

        post_body: {
            type: Datatypes.TEXT,
            allowNull: false,
        },

        user_id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        
        tag_id: {
            type: Datatypes.INTEGER,
            allowNull: true,
            references: {
                model: 'tag',
                key: 'id'
            }
        }
    },
    // Table Configuration
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

module.exports = Post;