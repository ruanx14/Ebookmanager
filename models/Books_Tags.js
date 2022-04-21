const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Books_Tags = sequelize.define('Books_Tags',{
    idBooks_Tags: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    idBooks: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'books', key: 'idBooks'},
        onUpdate : 'CASCADE',
        onDelete : 'CASCADE'
    },
    idTags: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'tags', key: 'idTags'},
        onUpdate : 'CASCADE',
        onDelete : 'CASCADE'
    },
});

module.exports = Books_Tags;