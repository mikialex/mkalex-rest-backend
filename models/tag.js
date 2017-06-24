const cast = require('../utils/cast.js');

class Tag{

  static async getTagList() {
    const result = await global.db.query('Select * From webPage_tag');
    let [tags] = cast.fromMysql(result);
    return tags;
  }

   static async getArticleRelateTag() {
    const result = await global.db.query('Select * From webPage_article_tags');
    let [tagsRelateArticles] = cast.fromMysql(result);
    return tagsRelateArticles;
   }
  
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

module.exports = Tag;