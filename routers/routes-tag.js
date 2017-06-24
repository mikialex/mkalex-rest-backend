const router = require('koa-router')();

const tag = require('../controllers/tags.js');


router.get('/tag', tag.getAllTag);  //All tags
router.get('/tag/articles', tag.getArticleRelateTag);  //All tags related to articles


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

module.exports = router.middleware();