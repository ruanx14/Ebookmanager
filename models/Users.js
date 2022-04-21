const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Users = sequelize.define('Users',{
    idUsers: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    levelUser: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Users;