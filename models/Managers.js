const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Managers = sequelize.define('Managers',{
    idManagers: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    idUsers: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    title: Sequelize.STRING(1000),
    author: Sequelize.STRING,
    pathEpub: Sequelize.STRING,
    sizeEpub: Sequelize.STRING,
    statusVisible: Sequelize.STRING
});

module.exports = Managers;