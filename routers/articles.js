const Article       = require('../models/article.js');
// const castBoolean  = require('./cast-boolean.js');


class ArticlesHandlers {

    static async getArticles(ctx) {
        try {

            let sql = 'Select * From webPage_article';
            // query-string filters?
            if (ctx.querystring) {
                const filter = Object.keys(ctx.query).map(function(q) { return q+' = :'+q; }).join(' and ');
                sql += ' Where '+filter;
            }
            // sql +=  ' Order By publish_time';

            const result = await ctx.state.db.query(sql, ctx.query);
            // const [members] = castBoolean.fromMysql(result);
            const articles = result;
            console.log(result);
            
            // No Content (preferred to returning 200 with empty list)
            if (articles.length == 0) { ctx.status = 204; return; }

            ctx.body = articles;
            ctx.body.root = 'Articles';

        } catch (e) {
            switch (e.code) {
                case 'ER_BAD_FIELD_ERROR': ctx.throw(403, 'Unrecognised Member field'); break;
                default: throw e;
            }
        }
    }


    /**
     * @api {get} /members/:id Get details of member (including team memberships).
     * @apiName   GetMembersId
     * @apiGroup  Members
     *
     * @apiHeader  Authorization            Basic Access Authentication token.
     * @apiHeader  [Accept=application/json] application/json, application/xml, text/yaml, text/plain.
     * @apiSuccess (Success 2xx) 200/OK     Full details of specified member.
     * @apiError   401/Unauthorized         Invalid JWT auth credentials supplied.
     * @apiError   404/NotFound             Member not found.
     */
    static async getMemberById(ctx) {
        const result = await global.db.query('Select * From Member Where MemberId = :id', { id: ctx.params.id });
        const [members] = castBoolean.fromMysql(result);
        const member = members[0];

        if (!member) ctx.throw(404, `No member ${ctx.params.id} found`); // Not Found

        // return id as attribute / underscore-field
        member._id = member.MemberId;

        // team membership
        const sql = 'Select TeamId As _id, concat("/teams/",TeamId) As _uri From TeamMember Where MemberId = :id';
        const [teams] = await ctx.state.db.query(sql, { id: ctx.params.id });
        member.Teams = teams;

        ctx.body = member;
        ctx.body.root = 'Member';
    }
  
    static async getMemberByUrlname(ctx) {
      const result = await global.db.query('Select * From Member Where MemberId = :id', { id: ctx.params.id });
      const [members] = castBoolean.fromMysql(result);
      const member = members[0];

      if (!member) ctx.throw(404, `No member ${ctx.params.id} found`); // Not Found

      // return id as attribute / underscore-field
      member._id = member.MemberId;

      // team membership
      const sql = 'Select TeamId As _id, concat("/teams/",TeamId) As _uri From TeamMember Where MemberId = :id';
      const [teams] = await ctx.state.db.query(sql, { id: ctx.params.id });
      member.Teams = teams;

      ctx.body = member;
      ctx.body.root = 'Member';
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