const Article = require('../models/article.js');
const cast = require('../utils/cast.js');

class ArticlesHandlers {

  static async getArticleList(ctx) {
    try {
      console.log(ctx.query)
      let sql = 'Select * From article';
      // if (ctx.querystring) {
      //   const filter = Object.keys(ctx.query).map(function(q) {
      //     return q + ' = :' + q;
      //   }).join(' and ');
      //   sql += ' Where ' + filter;
      // }
      sql += ' Order By create_time Desc';
      const result = await ctx.state.db.query(sql, ctx.query);
      let [articles] = cast.fromMysql(result);
      articles = articles.map((article) => {
        return {
          urlname: article.u_name,
          title: article.title,
          sub_title: article.sub_title,
          page_view: article.visit,
          has_cover: article.has_cover,
          publish_time: article.create_time,
        }
      })

      // No Content (preferred to returning 200 with empty list)
      if (articles.length == 0) {
        ctx.status = 204;
        return;
      }

      ctx.body = articles;

    } catch (e) {
      switch (e.code) {
        case 'ER_BAD_FIELD_ERROR':
          ctx.throw(403, 'Unrecognised Member field');
          break;
        default:
          throw e;
      }
    }
  }

  
  static async getArticleDetial(ctx) {
    try {
      let article = await Article.getDetailByUrlname(ctx.query.urlname)

      if (!article) ctx.throw(404, `Not found`); // Not Found

      ctx.body = article;

    } catch (e) {
      switch (e.code) {
        case 'ER_BAD_FIELD_ERROR':
          ctx.throw(403, 'Unrecognised Member field');
          break;
        default:
          throw e;
      }
    }
  }


  /**
   * @api {post} /members Create new member
   * @apiName    PostMembers
   * @apiGroup   Members
   *
   * @apiParam   ...                       [as per get].
   * @apiHeader  Authorization             Basic Access Authentication token.
   * @apiHeader  [Accept=application/json] application/json, application/xml, text/yaml, text/plain.
   * @apiHeader  Content-Type              application/x-www-form-urlencoded.
   * @apiSuccess (Success 2xx) 201/Created Details of newly created member.
   * @apiError   401/Unauthorized          Invalid JWT auth credentials supplied.
   * @apiError   403/Forbidden             Admin auth required.
   */
  // static async postMembers(ctx) {
  //     if (ctx.state.user.Role != 'admin') ctx.throw(403, 'Admin auth required'); // Forbidden

  //     ctx.request.body = await castBoolean.fromStrings('Member', ctx.request.body);

  //     const id = await Member.insert(ctx.request.body);

  //     ctx.body = await Member.get(id); // return created member details
  //     ctx.body.root = 'Member';
  //     ctx.set('Location', '/members/'+id);
  //     ctx.status = 201; // Created
  // }


  /**
   * @api {patch} /members/:id Update member details
   * @apiName     PatchMembers
   * @apiGroup    Members
   *
   * @apiParam   ...                       [as per get].
   * @apiHeader  Authorization             Basic Access Authentication token.
   * @apiHeader  [Accept=application/json] application/json, application/xml, text/yaml, text/plain.
   * @apiHeader  Content-Type              application/x-www-form-urlencoded.
   * @apiSuccess (Success 2xx) 200/OK      Updated member details.
   * @apiError   401/Unauthorized          Invalid JWT auth credentials supplied.
   * @apiError   403/Forbidden             Admin auth required.
   * @apiError   404/NotFound              Member not found.
   */
  // static async patchMemberById(ctx) {
  //     if (ctx.state.user.Role != 'admin') ctx.throw(403, 'Admin auth required'); // Forbidden

  //     ctx.request.body = await castBoolean.fromStrings('Member', ctx.request.body);

  //     await Member.update(ctx.params.id, ctx.request.body);

  //     // return updated member details
  //     ctx.body = await Member.get(ctx.params.id);
  //     if (!ctx.body) ctx.throw(404, `No member ${ctx.params.id} found`); // Not Found

  //     ctx.body.root = 'Member';
  // }


  /**
   * @api {delete} /members/:id Delete member
   * @apiName      DeleteMembers
   * @apiGroup     Members
   *
   * @apiHeader  Authorization        Basic Access Authentication token.
   * @apiSuccess (Success 2xx) 200/OK Full details of deleted member.
   * @apiError   401/Unauthorized     Invalid JWT auth credentials supplied.
   * @apiError   403/Forbidden        Admin auth required.
   * @apiError   404/NotFound         Member not found.
   */
  // static async deleteMemberById(ctx) {
  //     if (ctx.state.user.Role != 'admin') ctx.throw(403, 'Admin auth required'); // Forbidden

  //     // return deleted member details
  //     const member = await Member.get(ctx.params.id);

  //     if (!member) ctx.throw(404, `No member ${ctx.params.id} found`); // Not Found

  //     await Member.delete(ctx.params.id);

  //     ctx.body = member; // deleted member details
  //     ctx.body.root = 'Member';
  // }
}


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

module.exports = ArticlesHandlers;