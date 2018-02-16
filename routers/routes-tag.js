const Router = require('koa-router');

const TagRouter = new Router({
  prefix: '/tags'
})

const tag = require('../controllers/tags.js');
const auth = require('../controllers/auth.js');

 
TagRouter.get(      '/',    tag.getTagList);       // list articles
// TagRouter.get(      '/tag', tag.getArticleDetial);     // get article details
TagRouter.patch('/tag', auth.authFilter, tag.updateTag);    // change article details
TagRouter.post('/tag', auth.authFilter, tag.addTag);    // add article details
TagRouter.delete('/tag', auth.authFilter, tag.deleteTag);    // add article details

module.exports = TagRouter 