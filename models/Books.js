const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Books = sequelize.define('Books',{
    idBooks:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    idUsers:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    idGenres:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Genres', key: 'idGenres'},
    },
    pathCover: Sequelize.STRING,
    title: Sequelize.STRING,
    titleOriginal: Sequelize.STRING,
    publisher: Sequelize.STRING,
    author: Sequelize.STRING,
    yearPublic: Sequelize.STRING,
    pagesBook: Sequelize.INTEGER,
    synopsis: Sequelize.STRING(1000),
    aboutAuthor: Sequelize.STRING(1000),
    clickedCount: Sequelize.INTEGER,
    statusBook: Sequelize.STRING,
});
/* 
Books.associate = (models) => {
    Books.belongsTo(models,{foreignKey : 'idGenres'});
} */
module.exports = Books;