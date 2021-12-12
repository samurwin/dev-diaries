const Sequalize = require('sequelize');

require('dotenv').config();

// create connection to our database
let sequelize;

if(process.env.JAWSDB_URL) {
    sequelize = new Sequalize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequalize('dev_diaries_db', process.env.DB_USER, process.env.DB_PW, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    });    
}

module.exports = sequelize;
