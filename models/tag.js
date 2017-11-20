
class Tag{

  static async getTagList() {
    return await global.db.q('Select * From tag');
  }

  static async updateTag(newTagName, oldTagName) {
    return await global.db.query('Select * From tag');
  }

  static async deleteTag(name) {
    await global.db.query('delete from tag where tag_name= :name',{name});
  }

  static async newTag(newTagName) {
     await global.db.query('insert into tag (tag_name) values (:newTagName)',{newTagName});
  }

  //  static async getArticleRelateTag() {
  //   const result = await global.db.query('Select * From tag');
  //   let [tagsRelateArticles] = cast.fromMysql(result);
  //   return tagsRelateArticles;
  //  }
  
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

module.exports = Tag;