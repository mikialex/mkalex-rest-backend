const Router = require('koa-router');

const TagRouter = new Router({
  prefix: '/tags'
})

const tag = require('../controllers/tags.js');
const auth = require('../controllers/auth.js');

 
TagRouter.get(      '/',    tag.getTagList);       // list articles
// TagRouter.get(      '/tag', tag.getArticleDetial);     // get article details
TagRouter.patch(    '/tag', auth.tokenChecker(tag.updateTag));    // change article details
TagRouter.post(     '/tag', auth.tokenChecker(tag.addTag));    // add article details
TagRouter.delete(   '/tag',  auth.tokenChecker(tag.deleteTag));    // add article details

module.exports = TagRouter 