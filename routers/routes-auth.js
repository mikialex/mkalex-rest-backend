const router = require('koa-router')();

const auth = require('../controllers/auth.js');


router.post( '/login', auth.login);       // list articles
router.options( '/login', auth.preflight);       // list articles
// router.get(   '/articles/content', articles.getArticleDetial);    // get article details
// router.post(  '/members',     members.postMembers);      // add new member
// router.patch( '/members/:id', members.patchMemberById);  // update member details
// router.delete('/members/:id', members.deleteMemberById); // delete member

module.exports = router.middleware();