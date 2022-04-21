const routes = require('express').Router();
const managerController = require('../controllers/managerController');

routes.get('/user-manager', managerController.index);
routes.post('/user-manager/sendBook',managerController.sendBook);
routes.get('/user-panel/adicionarLivro', managerController.adicionarLivro);
routes.post('/user-panel/adicionarLivro', managerController.adicionarLivroDatabase);

module.exports = routes;