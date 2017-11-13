const Article = require('../models/article.js');
const cast = require('../utils/cast.js');

class ArticlesHandlers {

  static async getArticleList(ctx) {
    ctx.body = await Article.getArticleList();
  }


  static async getArticleDetial(ctx) {
    try {
      let article = await Article.getDetailByUrlname(ctx.query.urlname)
      await Article.addVisit(ctx.query.urlname)

      if (!article) ctx.throw(404, `Not found`); // Not Found

      ctx.body = article;

    } catch (e) { }
  }


}

module.exports = ArticlesHandlers;