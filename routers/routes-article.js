const router = require('koa-router')();

const articles = require('../controllers/articles.js');


router.options(   '/articles/article', articles.preflight);    // add article details
router.get(   '/articles',     articles.getArticleList);       // list articles
router.get(   '/articles/content', articles.getArticleContent);    // get article content
router.get(   '/articles/article', articles.getArticleDetial);    // get article details
router.patch(   '/articles/article', articles.updateArticleDetial);    // change article details
router.post(   '/articles/article', articles.addArticle);    // add article details
router.delete(   '/articles/article', articles.deleteArticle);    // add article details
// router.post(  '/members',     members.postMembers);      // add new member
// router.patch( '/members/:id', members.patchMemberById);  // update member details
// router.delete('/members/:id', members.deleteMemberById); // delete member

module.exports = router.middleware();