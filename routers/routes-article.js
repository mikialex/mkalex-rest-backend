const Router = require('koa-router');

const ArticleRouter = new Router({
  prefix: '/articles'
})

const articles = require('../controllers/articles.js');
const auth = require('../controllers/auth.js');


ArticleRouter.get(      '/',         articles.getArticleList);       // list articles
ArticleRouter.get(      '/content', articles.getArticleContent);    // get article content
ArticleRouter.get(      '/article', articles.getArticleDetial);     // get article details
ArticleRouter.patch(    '/article', auth.needAuthToken,articles.updateArticleDetial);    // change article details
ArticleRouter.post(     '/article', auth.needAuthToken,articles.addArticle);    // add article details
ArticleRouter.delete(   '/article', auth.needAuthToken, articles.deleteArticle);    // add article details

module.exports = ArticleRouter