
class Tag{

  static async getTagList() {
    return await global.db.q('SELECT * FROM tag');
  }

  static async deleteTag(name) {
    await global.db.query('DELETE FROM tag WHERE tag_name= :name',{name});
  }

  static async newTag(newTagName) {
     await global.db.query('INSERT INTO tag (tag_name) VALUES (:newTagName)',{newTagName});
  }
  
}

module.exports = Tag;