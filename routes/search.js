const router = require('express').Router();
searchController = require('../controllers/searchController');

router.get('/search/:tableName&:search',searchController.search);
router.get('/search/',searchController.search);


module.exports = router;