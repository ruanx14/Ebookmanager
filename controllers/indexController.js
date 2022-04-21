const Books = require('../models/Books');
const Genres = require('../models/Genres');
const Users = require('../models/Users');
const Highlights = require('../models/Highlights');
const { Op } = require("sequelize");
const crypto = require('crypto');


exports.index = async (req,res,next) =>  { 
    const {genres, tags, moreClicked} = await require('../utils/menus')();
    countBooks = await Books.count({
        where: {
            statusBook : 'approved'
        }
    });
    today = new Date();
    highLights = await Highlights.findByPk(1);
    dateDatabase = new Date(highLights.dateChange);
    //console.log(today);
    console.log(highLights);
    if(today<=dateDatabase){
        idBooksHigh = highLights.idBooks;
    }else{
        newDateChange = dateDatabase.setDate(today.getDate()+7);
        highLights.dateChange = newDateChange;
        idBooks = parseInt(Math.random() * countBooks);
         if(idBooks==0){
            idBooks = 3;
        } 
        highLights.idBooks = idBooks;
        highLights.save();
        idBooksHigh = highLights.idBooks;
    } 
        
    var highlight = await Books.findAll({
      where: {
          idBooks : idBooksHigh,
      },
      include: [{model:Genres}]
    });

    msg = {isThere : false, msg : 'null'}; 
    if(req.query.error=='pass'){
        msg.msg = "Senha incorreta";
        msg.isThere = true;
        msg.style = "error";
    }
    if(req.query.error=='notFound'){
        msg.msg = "Usuario não encontrado";
        msg.isThere = true;
        msg.style = "error";
    }
    if(req.query.error=='alreadyIn'){
        msg.msg = "Usuario já cadastrado";
        msg.isThere = true;
        msg.style = "error";
    } 
    if(req.query.error=='success'){
        msg.msg = "Usuario cadastrado com sucesso";
        msg.isThere = true;
        msg.style = "success";
    } 
    
    if(!req.session.acesso){
        showLogin = true;
        userLogged = {};
    }else{
        userLogged = {
            idUser : req.session.idUser,
            username : req.session.username,
        }
        showLogin = false;
    }
    Books.findAll({
        limit: 6,
        order: [
        ['idBooks','DESC']
        ],
        where:{
            'statusBook' : 'approved'
        },
        include: [{model:Genres}]
    })
    .then(result => {
        res.render('index',{genres : genres, books: result, tags : tags, moreClicked : moreClicked, highlight : highlight,showLogin: showLogin, msg : msg, userLogged : userLogged});
   })
    .catch(err => {
        console.log(err);
    });
};
exports.loginOrCreate = async (req,res,next) => {
    user = req.body;
    //user model.create with json to insert in database, instance of a user.save() to save in database
    if(user.email==undefined){
        passwordCrypto = crypto.createHash("md5").update(user.password).digest("hex");
        user.password = passwordCrypto;
        result = await Users.findAll({
            where: { 
                username: user.username 
            }
        });
        if(result.length>0){
            userSession = await Users.findAll({
                where: { 
                    password: user.password,
                    username: user.username 
                }
            });
            if(userSession.length>0){
                req.session.acesso = true;
                req.session.username = userSession[0].username;
                req.session.idUser = userSession[0].idUsers;
                req.session.levelUser = userSession[0].levelUser;
                res.redirect('/');
            }else{
                res.redirect('/?error=pass');
            }
         }else{
            res.redirect('/?error=notFound');
         }

    }else{         
        result = await Users.findAll({
            where: { 
                [Op.or]: [{ username: user.username }, { email: user.email}], 
            }
        });
        if(result.length>0){
            res.redirect('/?error=alreadyIn');
        }else{    
            user.levelUser = 'USER';
            passwordCrypto = crypto.createHash("md5").update(user.password).digest("hex");
            user.password = passwordCrypto;
            await Users.create(user);
            res.redirect('/?error=success');
        }
    }
    /* const [dates, created] = await Users.findOrCreate({
    where: {
        username: user.username,
        password: user.password,
        email: user.email
    },
    defaults: {
    levelUser: 'USER'
    }
});
    console.log(dates.username);
    console.log(created); 
    if (created) {
        console.log(dates.levelUser); 
    }
    } */
}
exports.logout = (req,res,next) => {
    req.session.destroy();
    res.redirect('/');
}