const routes = require('express').Router();

indexController = require("../controllers/indexController");

routes.get('/',indexController.index); 
routes.post('/loginOrCreate',indexController.loginOrCreate)
routes.get('/logout', indexController.logout);

module.exports = routes; 