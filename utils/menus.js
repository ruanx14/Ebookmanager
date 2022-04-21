const Books = require('../models/Books');
const Genres = require('../models/Genres');
const Tags = require('../models/Tags');

const {Op} = require('sequelize');

module.exports = async function menus(){   
    var genres = await Genres.findAll();     //genres 
    var tagsMax = await Tags.count(); //count de tags
    numberRandom = (max) => {
        return Math.floor(Math.random() * (max - 1)) + 1;
    }
    numberRandomBetween = () => {
        return Math.floor(Math.random() * (10 - 1)) + 1;
    }
    //tags aleatorias
    /*     var tags = await Tags.findAll({
            where: {
                idTags: {
                    [Op.between]: [numberRandom(tagsMax),numberRandom(tagsMax)], 
                }
            },
            limit: numberRandomBetween()
        }); */
    var tags = await Tags.findAll();
    //mais clicados
    var moreClicked = await Books.findAll({
        limit: 4,
        order: [
        ['clickedCount','DESC']
        ],
        where:{
            'statusBook' : 'approved'
        },
    });
    return {genres : genres, tags : tags, moreClicked:moreClicked}
}
