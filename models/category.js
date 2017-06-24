const cast = require('../utils/cast.js');

class Category{
  static async getCategoryList() {
    const result = await global.db.query('Select * From webPage_category');
    let [categories] = cast.fromMysql(result);
    return categories;
  }
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

module.exports = Category;