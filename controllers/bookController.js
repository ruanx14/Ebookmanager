const Books = require('../models/Books');
const Genres = require('../models/Genres');
const Comments = require('../models/Comments');
const Users = require('../models/Users');
const Managers = require('../models/Managers');
const {Op} = require("sequelize");

exports.book = async (req,res,next) =>  {
    const {genres, tags, moreClicked} = await require('../utils/menus')();
    idBooks = req.params.idBooks;
    if(isNaN(idBooks)){
        res.redirect('./');
        return;
    }
    const comments = await Comments.findAll({
        where: { 
            idBooks: idBooks
        },
        include: [
            { model: Users }
        ]
    });
    //logado
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
    //msgs de erro
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
    if(req.query.error=="missLogin"){
        msg.msg = "Você precisa logar";
        msg.isThere = true;
        msg.style = "error";
    }
    if(req.query.error=="missMessage"){
        msg.msg = "Não se esqueça de escrever o comentário";
        msg.isThere = true;
        msg.style = "error";
    }
    if(req.query.error=="doneComment"){
        msg.msg = "Comentário adicionado com sucesso";
        msg.isThere = true;
        msg.style = "success";
    }
    const book = await Books.findByPk(idBooks);
    book.clickedCount = parseInt(book.clickedCount) + 1;
    await book.save();
    //managers por padrao public
    managers = await Managers.findAll({
        where: { 
            title: {
                [Op.substring]: book.title, 
            }
        },
        include:[
            {model: Users}
        ]
    });
    Books.findAll({
        where: {
            idBooks: idBooks
        },
        include: [
            {model: Genres}
        ]
    }).then(result => {
        res.render('book',{genres : genres, book: result[0], tags : tags, moreClicked : moreClicked, comments: comments,showLogin: showLogin, msg: msg, managers : managers});
    });
    
        
};
exports.adicionarComentario = async (req,res,next) => {
    if(!req.session.acesso){
       res.redirect('/book/'+req.params.idBooks+'?error=missLogin');
    }else{
        if(req.body.msg==""){
            res.redirect('/book/'+req.params.idBooks+'?error=missMessage');
        }else{
            today = new Date().toLocaleDateString();
            await Comments.create({
                idUsers : req.session.idUser,
                idBooks : req.params.idBooks,
                textComment : req.body.msg,
                datePublic : today,
                statusComment : 'Approved'
            });
            res.redirect('/book/'+req.params.idBooks+'?error=doneComment');
        }
    }
    
}
exports.downloadBook = async (req,res,next) => {
    bookName = req.params.title;
    res.download("./views/user-panel/epubs/"+bookName);
}