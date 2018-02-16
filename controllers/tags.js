const Tag = require('../models/tag.js');

class TagHandler{

  static async getTagList(ctx) {
    ctx.body = await Tag.getTagList();
  }


  static async updateTag(ctx) {
    ctx.body = await Tag.getArticleRelateTag();
  }  

  static async addTag(ctx) {
    await Tag.newTag(ctx.request.body.tagName);
     ctx.body={result:'success'}
  }  

  static async deleteTag(ctx) {
    await Tag.deleteTag(ctx.query.tagName);
    ctx.body={result:'success'}
  }  

}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

module.exports = TagHandler;