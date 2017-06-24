const router = require('koa-router')(); // router middleware for koa

const articles = require('./articles.js');


router.get(   '/articles',     articles.getArticles);       // list members
// router.get(   '/aricles/:urlname', aricles.getMemberById);    // get member details
// router.post(  '/members',     members.postMembers);      // add new member
// router.patch( '/members/:id', members.patchMemberById);  // update member details
// router.delete('/members/:id', members.deleteMemberById); // delete member


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

module.exports = router.middleware();