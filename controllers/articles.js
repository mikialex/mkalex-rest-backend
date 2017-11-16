const Article = require('../models/article.js');
const Auth = require('./auth.js');

class ArticlesHandlers {


  static async getArticleList(ctx) {
    // console.log(typeof await Article.getArticleList() )
    ctx.body = await Article.getArticleList();
  }


  static async getArticleContent(ctx) {
    let article = await Article.getArticleContentByUrlname(ctx.query.urlname)
    await Article.addVisit(ctx.query.urlname)

    if (!article) ctx.throw(404, `Not found`); // Not Found

    ctx.body = article;
  }

  static async getArticleDetial(ctx) {
    ctx.body = await Article.getArticleDetialByUrlName(ctx.query.urlname)
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