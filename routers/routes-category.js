const router = require('koa-router')();

const category = require('../controllers/categories.js');


router.get('/category', category.getAllCategory);  //All categories



/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

module.exports = router.middleware();