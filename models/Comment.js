const { Model, Datatypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {};

Comment.init (
    // define Comment model columns
    {
        id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },

        comment_body: {
            type: Datatypes.STRING(150),
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
        post_id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            references: {
                model: 'post',
                key: 'id'
            }
        }
    },
    // Table Configurations
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        timestamps: true,
        modelName: 'comment'
    }
);

module.exports = Comment;