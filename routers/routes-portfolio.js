const router = require('koa-router')();

const articles = require('../controllers/articles.js');


router.get(   '/portfolios',     articles.getArticleList);       // list articles
router.get(   '/portfolios/content', articles.getArticleDetial);    // get article details
// router.post(  '/members',     members.postMembers);      // add new member
// router.patch( '/members/:id', members.patchMemberById);  // update member details
// router.delete('/members/:id', members.deleteMemberById); // delete member


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

module.exports = router.middleware();