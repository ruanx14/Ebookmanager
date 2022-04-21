const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Tags = sequelize.define('Tags',{
    idTags: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    tags: Sequelize.STRING
});


module.exports = Tags;