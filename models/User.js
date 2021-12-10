const bcrypt = require('bcrypt');
const { Model, Datatypes } = require('sequelize');

// create the User model
class User extends Model {
    // method to check password
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    // define User model columns
    {
        id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },

        username: {
            type: Datatypes.STRING,
            allowNull: false,
        },

        email: {
            type: Datatypes.STRING,
            allowNull: false,
            unique: true,
            // validate email
            validate: {
                isEmail: true
            }
        },

        password: {
            type: Datatypes.STRING,
            allowNull: false,
            // validate password
            validate: {
                len: [6],
            }
        }
    },
    // Table configuration
    {
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(newUserData.password, 10);
                return updatedUserData;
            }
        },
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;