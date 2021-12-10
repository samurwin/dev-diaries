const { Model, Datatypes } = require('sequelize');

class Tag extends Model {};

Tag.init (
    // define Tag model columns
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
        }
    },
    // Table Configurations
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'tag'
    }
);

module.exports = Tag;