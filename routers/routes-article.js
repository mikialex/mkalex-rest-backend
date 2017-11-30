const Router = require('koa-router');

const ArticleRouter = new Router({
  prefix: '/articles'
})

const articles = require('../controllers/articles.js');
const auth = require('../controllers/auth.js');
 
ArticleRouter.get(      '/',         articles.getArticleList);       // list articles
ArticleRouter.get('/admin', auth.tokenChecker(articles.getArticleListAdmin));    // get article content
ArticleRouter.get('/content', articles.getArticleContent);    // get article content
ArticleRouter.get('/tags', articles.getAricleTagList);    // get article contents
ArticleRouter.post('/tag', auth.tokenChecker(articles.addTag));    // get article contents
ArticleRouter.delete('/tag', auth.tokenChecker(articles.removeTag));    // get article contents

ArticleRouter.get('/article', articles.getArticleDetial);     // get article details
ArticleRouter.get('/article/admin',auth.tokenChecker(articles.getArticleDetialAdmin));     // get article details


ArticleRouter.patch(    '/article', auth.tokenChecker(articles.updateArticleDetial));    // change article details
ArticleRouter.post(     '/article', auth.tokenChecker(articles.addArticle));    // add article details
ArticleRouter.delete(   '/article',  auth.tokenChecker(articles.deleteArticle));    // add article details

module.exports = ArticleRouter