const User = require('../models/Users');
const Manager = require('../models/Managers');
const Genres = require('../models/Genres');
const Tags = require('../models/Tags');
const Books = require('../models/Books');
const BooksTags = require('../models/Books_Tags');

exports.index = async (req,res,next) => {
    if(!req.session.acesso){
       res.redirect('../');
    }else{
        msg = {isThere: false, msg: false}
        if(req.query.msg=='done'){
            msg.isThere = true;
            msg.style = "success";
            msg.msg = "Livro enviado com sucesso!";
        }
        if(req.query.msg=='missing'){
            msg.isThere = true;
            msg.style = "error";
            msg.msg = "Preencha todos os campos";
        }
        if(req.query.msg=='wrongFile'){
            msg.isThere = true;
            msg.style = "error";
            msg.msg = "Formato de documentos inválidos, apenas EPUB e PDF";
        }
        Manager.findAll({
            where: {
                idUsers : req.session.idUser
            },
            include: [
                {model : User}
            ]
        }).then(result => {
            res.render('user-panel/user-panel', {managers : result, levelUser : req.session.levelUser, msg : msg});
        })
    }
}
exports.sendBook = async (req,res,next) => {
if(!req.body.title || !req.body.author || req.files.bookName[0]==undefined){
        res.redirect('/user-manager?msg=missing');
    }else{
        if(req.files.bookName[0].mimetype=='application/pdf' || req.files.bookName[0].mimetype=='application/epub+zip'){
        await Manager.create({
            idUsers : req.session.idUser,
            title : req.body.title,
            author : req.body.author,
            pathEpub : req.files.bookName[0].filename,
            sizeEpub : req.files.bookName[0].size+'KB',
            statusVisible: 'public'
        });   
            res.redirect('/user-manager?msg=done'); 
        }else{
            res.redirect('/user-manager?msg=wrongFile');
        } 
    }
}
exports.adicionarLivro = async (req,res,next) => {
    genres = await Genres.findAll();
    tags = await Tags.findAll();
    msg = "nada";
    msg = {msg : ''};
    if(req.query.msg=='missing'){
        msg.style = 'error';
        msg.msg = 'Preencha todos os campos!';
    }
    if(req.query.msg=='success'){
        msg.style = 'success';
        msg.msg = 'Livro adicionado com sucesso, está em análise!';
    }
    res.render('./adm-panel/index',{tags : tags, genres : genres, msg: msg, levelUser: req.session.levelUser, msg : msg});
}

exports.adicionarLivroDatabase = async (req,res,next) => {
    book = req.body;
    book.clickedCount = 0;
    book.statusBook = 'waiting';
    book.idUsers = req.session.idUser;
    isEmptyPost = function(campField){
        if(campField==''){
            return true;
        }else{
            return false;
        }
    }
    error = false;
     if(book.tags == undefined){
        error = true;
    }
    if(req.files.pathCover==undefined){
        error = true;
    }else{
        book.pathCover = req.files.pathCover[0].filename;
    } 
    if(error==false){
        if(isEmptyPost(book.title) || isEmptyPost(book.titleOriginal) || isEmptyPost(book.author) || isEmptyPost(book.yearPublic) || isEmptyPost(book.pagesBook) || isEmptyPost(book.synopsis) || isEmptyPost(book.aboutAuthor) || isNaN(book.pagesBook)){   
            res.redirect('/user-panel/adicionarLivro?msg=missing');
        }else{
             idBook = await Books.create(book);
                for(var i=0;i<book.tags.length;i++){
                    await BooksTags.create({
                        idBooks : idBook.idBooks,
                        idTags : book.tags[i]
                    });
                }    
            res.redirect('/user-panel/adicionarLivro?msg=success');
        }   
    } 
}
