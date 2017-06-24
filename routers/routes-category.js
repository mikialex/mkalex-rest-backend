const router = require('koa-router')();

const articles = require('../controller/articles.js');


router.get('/category',articles.getArticleList);  


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

module.exports = router.middleware();