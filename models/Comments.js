const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Comments = sequelize.define('Comments',{
    idComments: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    idUsers: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    idBooks: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    textComment: Sequelize.STRING(1000),
    datePublic: Sequelize.STRING,
    statusComment: Sequelize.STRING
});

module.exports = Comments;