const Article = require('../models/article.js');

function respondSuccess(ctx) {
  ctx.body = { result: 'success' };
  return ctx;
}

class ArticlesHandlers {

  static async getArticleList(ctx) {
    ctx.body = await Article.getArticleList();
  }

  static async getArticleListAdmin(ctx) {
    ctx.body = await Article.getArticleListAdmin();
  }

  static async getArticleContent(ctx) {
    let article = await Article.getArticleContentByUrlname(ctx.query.urlname)
    await Article.addVisit(ctx.query.urlname)

    if (!article) ctx.throw(404, `Not found`); // Not Found

    ctx.body = article;
  }

  static async getArticleDetailAdmin(ctx) {
    let article = await Article.getArticleContentByUrlnameAdmin(ctx.query.urlname)
    await Article.addVisit(ctx.query.urlname)

    if (!article) ctx.throw(404, `Not found`); // Not Found

    ctx.body = article;
    
  }

  static async getAricleTagList(ctx) {
    ctx.body = await Article.getAricleTagList(ctx.query.urlname);
  }

  static async getArticleDetail(ctx) {
    await Article.addVisit(ctx.query.urlname)
    ctx.body = await Article.getArticleDetailByUrlName(ctx.query.urlname)
  }

  static async addTag(ctx) {
    await Article.addTag(ctx.request.body.urlname, ctx.request.body.tagname)
    respondSuccess(ctx);
  }

  static async removeTag(ctx) {
    await Article.removeTag(ctx.query.urlname,ctx.query.tagname)
    respondSuccess(ctx);
  }

  static async updateArticleDetail(ctx) {
    try {
      await Article.updateArticleDetail(ctx.request.body);
      respondSuccess(ctx);
    } catch (error) {
      ctx.body={result:'error',message:error}
    }
  }

  static async addArticle(ctx) {
    const data = ctx.request.body;
    if ( await Article.isExistSameUrlname(data.urlname)) {
      ctx.body={result:'error',message:'urlname already exist'}
    } else {
        await Article.addArticle(data);
        respondSuccess(ctx);
    }
  }

  static async deleteArticle(ctx) {
    const urlname = ctx.query.urlname;
    if ( await Article.isExistSameUrlname(urlname)) {
      await Article.deleteArticle(urlname);
      respondSuccess(ctx);
    } else {
      ctx.body={result:'error',message:'delete failed'}
    }

  }

}

module.exports = ArticlesHandlers; 