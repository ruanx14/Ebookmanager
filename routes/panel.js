const routes = require('express').Router();
const panelController = require('../controllers/panelController');
routes.get('/adm-panel',panelController.index);

routes.post('/adm-panel/newTag',panelController.newTag);
routes.post('/adm-panel/newGenre',panelController.newGenre);

routes.post('/adm-panel/bookSituation',panelController.updateBook);

module.exports = routes;