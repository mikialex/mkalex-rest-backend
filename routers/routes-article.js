const Router = require('koa-router');

const ArticleRouter = new Router({
  prefix: '/articles'
})

const articles = require('../controllers/articles.js');
const auth = require('../controllers/auth.js');

ArticleRouter.get('/', articles.getArticleList);       // list articles
ArticleRouter.get('/admin', auth.authFilter, articles.getArticleListAdmin);    // get article content
ArticleRouter.get('/content', articles.getArticleContent);    // get article content
ArticleRouter.get('/tags', articles.getAricleTagList);    // get article contents
ArticleRouter.post('/tag', auth.authFilter, articles.addTag);    // get article contents
ArticleRouter.delete('/tag', auth.authFilter, articles.removeTag);    // get article contents

ArticleRouter.get('/article', articles.getArticleDetail);     // get article details
ArticleRouter.get('/article/admin', auth.authFilter, articles.getArticleDetailAdmin);     // get article details


ArticleRouter.patch('/article', auth.authFilter, articles.updateArticleDetail);    // change article details
ArticleRouter.post('/article', auth.authFilter, articles.addArticle);    // add article details
ArticleRouter.delete('/article', auth.authFilter, articles.deleteArticle);    // add article details

module.exports = ArticleRouter