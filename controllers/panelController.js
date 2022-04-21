const Books = require('../models/Books');
const Tags = require('../models/Tags');
const Genres = require('../models/Genres');
exports.index = async (req,res,next) => {
    //verificar sessao
    books = await Books.findAll({
        where: {
            'statusBook' : 'waiting'
        }
    });
    noNewBook = false;
    if(books.length==0){
        noNewBook = true;
    }
    msg = {msg : ''};
    if(req.query.msg=='missing'){
        msg.style = 'error';
        msg.msg = "Preencha os campos";
    }
    if(req.query.msg=='success'){
        msg.style = 'success';
        msg.msg = "Adicionado com sucesso!";
    }
    res.render('./adm-panel/panel',{book: books, levelUser : req.session.levelUser, noNewBook : noNewBook, msg : msg});
}
exports.newTag = async(req,res,next) => {
     if(req.body.tags==''){
        res.redirect('/adm-panel?msg=missing');
    }else{
        tag = await Tags.create(req.body);
        res.redirect('/adm-panel?msg=success');
    } 
}
exports.newGenre = async(req,res,next) => {
    if(req.body.genres==''){
        res.redirect('/adm-panel?msg=missing');
    }else{
        genre = await Genres.create(req.body);
        res.redirect('/adm-panel?msg=success');
    } 
}
exports.updateBook = async(req,res,next) => {
    if(req.body.statusBook==undefined){
        res.redirect('/adm-panel?msg=missing');
    }else{
        book = await Books.findByPk(req.body.idBooks);
        book.statusBook = req.body.statusBook;
        book.save();
        res.redirect('/adm-panel?msg=success');
    }
}