//import Sequelize constructor
const Sequelize = require('sequelize');

require('dotenv').config();

//create db connection, pass MySQL information for username/pw

let sequelize;

if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host: 'localhost',
        dialect: 'mysql',
        port: '3307'
    });
}

module.exports = sequelize;