const Sequelize = require('sequelize');

require('dotenv').config();

const sequelize = new Sequelize('ebookmanager','ebookmanager','ebmroot123', {
    dialect: 'mysql',
    host: 'mysql.ebookmanager.com.br',
    define: {
        timestamps: false
    }
});

module.exports = sequelize;