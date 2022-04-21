const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Highlights = sequelize.define('Highlights',{
    idHighlights: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    idBooks: Sequelize.INTEGER,
    dateChange: Sequelize.DATE
});
module.exports = Highlights;