const Article = require('../models/article.js');
const Auth = require('./auth.js');

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


  static async getArticleDetialAdmin(ctx) {
    // ctx.body = await Article.getArticleList();
    
  }

  static async getAricleTagList(ctx) {
    ctx.body = await Article.getAricleTagList(ctx.query.urlname);
  }

  static async getArticleDetial(ctx) {
    await Article.addVisit(ctx.query.urlname)
    ctx.body = await Article.getArticleDetialByUrlName(ctx.query.urlname)
  }

  static async addTag(ctx) {
    await Article.addTag(ctx.request.body.urlname, ctx.request.body.tagname)
    ctx.body={result:'success'}
  }

  static async removeTag(ctx) {
    await Article.removeTag(ctx.query.urlname,ctx.query.tagname)
    ctx.body={result:'success'}
  }


  static async updateArticleDetial(ctx) {
    try {
      await Article.updateArticleDetial(ctx.request.body.params);
      ctx.body={result:'success'}
    } catch (error) {
      ctx.body={result:'error',message:error}
    }
  }

  static async updateArticleDetial(ctx) {
    try {
      await Article.updateArticleDetial(ctx.request.body.params);
      ctx.body={result:'success'}
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
        ctx.body={result:'success'}
    }
  }

  static async deleteArticle(ctx) {
    const urlname = ctx.query.urlname;
    console.log(urlname);

    if ( await Article.isExistSameUrlname(urlname)) {
      await Article.deleteArticle(urlname);
      ctx.body = { result: 'success' };
    } else {
      ctx.body={result:'error',message:'delete failed'}
    }

  }


}

module.exports = ArticlesHandlers; 