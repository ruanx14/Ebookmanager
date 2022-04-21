const Sequelize = require('sequelize');

require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE, process.env.USERNAMEDB, process.env.PASSWORD, {
    dialect: process.env.DIALECT,
    host: process.env.HOST,
    define: {
        timestamps: false
    }
});

module.exports = sequelize;