const Category = require('../models/category.js');

class CategoryHandler{
  static async getAllCategory(ctx) {
    try {
      ctx.body = await Category.getCategoryList();

    } catch (e) {
      
    }
  }
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

module.exports = CategoryHandler;