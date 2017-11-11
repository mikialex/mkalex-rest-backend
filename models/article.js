const cast = require('../utils/cast.js');

class Article {


  // static async getDetialById(id) {
  //   const result = await global.db.query('Select * From webPage_article Where id = :id', {
  //     id
  //   });
  //   let [articles] = cast.fromMysql(result);
  //   const article = articles[0];
  //   return article;
  // }

   static async getDetailByUrlname(urlname) {
    const result = await global.db.query('Select * From article Where u_name = :urlname', {
      urlname
    });
    let [articles] = cast.fromMysql(result);
    const article = articles[0];
    return article;
  }


  // static async getBy(field, value) {
  //   try {

  //     const sql = `Select * From Member Where ${field} = :${field} Order By Firstname, Lastname`;

  //     const [members] = await global.db.query(sql, {
  //       [field]: value
  //     });

  //     return members;

  //   } catch (e) {
  //     switch (e.code) {
  //       case 'ER_BAD_FIELD_ERROR':
  //         throw new ModelError(403, 'Unrecognised Member field ' + field);
  //       default:
  //         Lib.logException('Member.getBy', e);
  //         throw new ModelError(500, e.message);
  //     }
  //   }
  // }



  // static async insert(values) {
  //   // validation - somewhat artificial example serves to illustrate principle
  //   if (values.Firstname == null && values.Lastname == null) {
  //     throw new ModelError(403, 'Firstname or Lastname must be supplied');
  //   }

  //   try {

  //     const [result] = await global.db.query('Insert Into Member Set ?', [values]);
  //     //console.log('Member.insert', result.insertId, new Date); // eg audit trail?
  //     return result.insertId;

  //   } catch (e) {
  //     switch (e.code) { // just use default MySQL messages for now
  //       case 'ER_BAD_NULL_ERROR':
  //       case 'ER_NO_REFERENCED_ROW_2':
  //       case 'ER_NO_DEFAULT_FOR_FIELD':
  //         throw new ModelError(403, e.message); // Forbidden
  //       case 'ER_DUP_ENTRY':
  //         throw new ModelError(409, e.message); // Conflict
  //       case 'ER_BAD_FIELD_ERROR':
  //         throw new ModelError(500, e.message); // Internal Server Error for programming errors
  //       default:
  //         Lib.logException('Member.insert', e);
  //         throw new ModelError(500, e.message); // Internal Server Error for uncaught exception
  //     }
  //   }
  // }

  // static async update(id, values) {
  //   // validation - somewhat artificial example serves to illustrate principle
  //   if (values.Firstname == null && values.Lastname == null) {
  //     throw new ModelError(403, 'Firstname or Lastname must be supplied');
  //   }

  //   try {

  //     await global.db.query('Update Member Set ? Where MemberId = ?', [values, id]);
  //     //console.log('Member.update', id, new Date); // eg audit trail?

  //   } catch (e) {
  //     switch (e.code) { // just use default MySQL messages for now
  //       case 'ER_BAD_NULL_ERROR':
  //       case 'ER_DUP_ENTRY':
  //       case 'ER_ROW_IS_REFERENCED_2':
  //       case 'ER_NO_REFERENCED_ROW_2':
  //         throw new ModelError(403, e.message); // Forbidden
  //       case 'ER_BAD_FIELD_ERROR':
  //         throw new ModelError(500, e.message); // Internal Server Error for programming errors
  //       default:
  //         Lib.logException('Member.update', e);
  //         throw new ModelError(500, e.message); // Internal Server Error for uncaught exception
  //     }
  //   }
  // }


  // static async delete(id) {
  //   try {

  //     await global.db.query('Delete From Member Where MemberId = :id', {
  //       id
  //     });
  //     //console.log('Member.delete', id, new Date); // eg audit trail?

  //   } catch (e) {
  //     switch (e.code) {
  //       case 'ER_ROW_IS_REFERENCED_': // trailing underscore?
  //       case 'ER_ROW_IS_REFERENCED_2':
  //         // related record exists in TeamMember
  //         throw new ModelError(403, 'Member belongs to team(s)'); // Forbidden
  //       default:
  //         Lib.logException('Member.delete', e);
  //         throw new ModelError(500, e.message); // Internal Server Error
  //     }
  //   }
  // }

}


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

module.exports = Article;