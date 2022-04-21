const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Genres = sequelize.define('Genres',{
    idGenres: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    genres: Sequelize.STRING
});/* 
Genres.associate = function(models){
    Genres.hasOne(models,{foreignKey : 'idGenres'});
}
 */
module.exports = Genres;