
class Tag{

  static async getTagList() {
    return await global.db.q('Select * From tag');
  }

  static async deleteTag(name) {
    await global.db.query('delete from tag where tag_name= :name',{name});
  }

  static async newTag(newTagName) {
     await global.db.query('insert into tag (tag_name) values (:newTagName)',{newTagName});
  }
  
}

module.exports = Tag;