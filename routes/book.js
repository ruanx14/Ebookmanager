const routes = require('express').Router();
bookController = require('../controllers/bookController');

routes.get('/book/:idBooks',bookController.book);

routes.get('/book',function(req,res){
    res.redirect('../');
});
routes.post('/book/:idBooks/adicionarComentario',bookController.adicionarComentario);
routes.get('/download/:title', bookController.downloadBook);

module.exports = routes;