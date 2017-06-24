const Tag = require('../models/tag.js');

class TagHandler{

  static async getAllTag(ctx) {
    try {
      ctx.body = await Tag.getTagList();

    } catch (e) {
      
    }
  }

  static async getArticleRelateTag(ctx) {
    try {
      ctx.body = await Tag.getArticleRelateTag();

    } catch (e) {
      
    }  
  }  

}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

module.exports = TagHandler;