const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Reviews = sequelize.define('Reviews',{
    idReviews: {
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
    title: Sequelize.STRING(1000),
    textReviews: Sequelize.STRING,
    spoiler: Sequelize.STRING,
    datePost: Sequelize.STRING
});

module.exports = Reviews;