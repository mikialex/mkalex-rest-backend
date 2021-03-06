const ARTICLE_DB_META = {
  tableName: 'article',

}

class Article {

  static timeCast(time) {
    return time.toISOString().substring(0, 10)
  }

  static async getArticleList() {
    let sql =
      `SELECT * FROM ${ARTICLE_DB_META.tableName} 
      LEFT JOIN article_with_tag
      ON article.u_name =article_with_tag.article
      ORDER BY create_time Desc`;

    const rawResult = await global.db.q(sql);

    let articles = [];

    function hasArticle(name) {
      let find = -1;
      articles.forEach((article, index) => {
        if (article.urlname === name) {
          find = index;
        }
      })
      return find;
    }

    rawResult.filter(item => {
      return item.is_active
    })
      .forEach(item => {
        let idx = hasArticle(item.u_name)
        if (idx !== -1) {
          if (item.tag !== null) {
            articles[idx].tags.push(item.tag)
          }
        } else {
          articles.push({
            urlname: item.u_name,
            title: item.title,
            sub_title: item.sub_title,
            page_view: item.visit,
            has_cover: item.has_cover,
            cover_url: item.cover_url ? item.cover_url : '',
            publish_time: Article.timeCast(item.create_time),
            is_recommended: item.is_recommended,
            usefor: item.usefor,
            tags: (item.tag !== null) ? [item.tag] : []
          })

        }
      });
    return articles;
  }

  static async getArticleListAdmin() {
    let sql =
      `SELECT * FROM ${ARTICLE_DB_META.tableName} 
     LEFT JOIN article_with_tag
    ON article.u_name =article_with_tag.article
    ORDER BY create_time Desc`;

    const rawResult = await global.db.q(sql);

    let articles = [];

    function hasArticle(name) {
      let find = -1;
      articles.forEach((article, index) => {
        if (article.urlname === name) {
          find = index;
        }
      })
      return find;
    }

    rawResult.forEach(item => {
      let idx = hasArticle(item.u_name)
      if (idx !== -1) {
        if (item.tag !== null) {
          articles[idx].tags.push(item.tag)
        }
      } else {
        articles.push({
          urlname: item.u_name,
          title: item.title,
          sub_title: item.sub_title,
          page_view: item.visit,
          has_cover: item.has_cover,
          cover_url: item.cover_url ? item.cover_url : '',
          publish_time: Article.timeCast(item.create_time),
          is_recommended: item.is_recommended,
          usefor: item.usefor,
          tags: (item.tag !== null) ? [item.tag] : [],
          is_active: item.is_active,
        })

      }
    });
    return articles;
  }

  static async getArticleContentByUrlname(urlname) {
    const sql = `
    SELECT content FROM ${ARTICLE_DB_META.tableName} 
    WHERE u_name = :urlname
    `
    const articles = await global.db.q(sql, { urlname });
    return articles[0];
  }

  static async getArticleDetailByUrlName(urlname) {
    let sql =
      `SELECT * FROM ${ARTICLE_DB_META.tableName}  
      LEFT JOIN article_with_tag
    ON article.u_name = article_with_tag.article
    WHERE article.u_name=:urlname`;

    const articles = await global.db.q(sql, { urlname });
    let tags = [];
    articles.forEach(article => {
      if (article.tag !== null) {
        tags.push(article.tag);
      }
    })
    let article = articles[0];
    if (article && article.is_active) {
      return {
        urlname: article.u_name,
        title: article.title,
        sub_title: article.sub_title,
        page_view: article.visit,
        has_cover: article.has_cover,
        cover_url: article.cover_url ? article.cover_url : '',
        publish_time: Article.timeCast(article.create_time),
        content: article.content,
        is_recommended: article.is_recommended,
        usefor: article.usefor,
        tags: tags
      };
    }
  }

  static async getArticleContentByUrlnameAdmin(urlname) {
    let sql =
      `SELECT * FROM ${ARTICLE_DB_META.tableName} 
       LEFT JOIN article_with_tag
       ON article.u_name = article_with_tag.article
       WHERE article.u_name=:urlname`;

    const articles = await global.db.q(sql, { urlname });
    let tags = [];
    articles.forEach(article => {
      if (article.tag !== null) {
        tags.push(article.tag);
      }
    })
    let article = articles[0];
    if (article) {
      return {
        urlname: article.u_name,
        title: article.title,
        sub_title: article.sub_title,
        page_view: article.visit,
        has_cover: article.has_cover,
        cover_url: article.cover_url ? article.cover_url : '',
        publish_time: Article.timeCast(article.create_time),
        content: article.content,
        is_recommended: article.is_recommended,
        usefor: article.usefor,
        tags: tags,
        is_active: article.is_active,
      };
    }
  }

  static async getAricleTagList(urlname) {
    const sql = `
    SELECT tag FROM article_with_tag WHERE article = :urlname
    `
    let list = await global.db.q(sql, { urlname })
    return list
  }

  static async addVisit(urlname) {
    let oldvisit = await global.db.q(`SELECT visit FROM ${ARTICLE_DB_META.tableName} WHERE u_name = :urlname`, { urlname })
    let newvisit = oldvisit[0].visit + 1;
    await global.db.query(`UPDATE ${ARTICLE_DB_META.tableName} SET visit = :newvisit WHERE u_name=:urlname`, { urlname, newvisit })
  }

  static async addTag(urlname, tag) {
    let tagExist = await global.db.q('SELECT article FROM article_with_tag WHERE tag = :tag and article=:urlname', { urlname, tag })

    if (tagExist.length === 0) {
      let sql =
        `
      INSERT INTO article_with_tag
      (id,article,tag)
      VALUES 
      (null,:urlname,:tag)
      `
      await global.db.query(sql, { urlname, tag })
    }

  }

  static async removeTag(urlname, tag) {
    await global.db.query('DELETE FROM article_with_tag WHERE article=:urlname and tag=:tag', { urlname, tag })
  }


  static async addArticle(newArticleDetail) {
    let sql =
      `
      INSERT INTO article 
      (u_name,title,sub_title,visit,has_cover,create_time,is_recommended,content,usefor,is_active)
      VALUES 
      (:urlname,:title,:sub_title,:visit,:has_cover,:create_time,:is_recommended,:content,:usefor,:is_active)
      `
    await global.db.query(sql, newArticleDetail)
  }

  static async updateArticleDetail(newArticleDetail) {
    let sql =
      `
      UPDATE article 
      SET content=:content ,u_name=:urlname ,usefor=:usefor ,is_active=:is_active,
      title=:title, sub_title=:sub_title, visit=:visit, has_cover=:has_cover,
      create_time=:create_time, is_recommended=:is_recommended, cover_url=:cover_url
      WHERE u_name=:urlname
      `
    await global.db.query(sql, newArticleDetail)
  }

  static async isExistSameUrlname(urlname) {
    let sql =
      `
    SELECT u_name FROM article WHERE u_name=:urlname
    `
    let ret = await global.db.q(sql, { urlname })
    if (ret.length !== 0) {
      return true
    } else {
      return false
    }
  }

  static async deleteArticle(urlname) {
    let sql =
      `
      DELETE FROM article WHERE u_name=:urlname
      `
    let ret = await global.db.query(sql, { urlname })
  }

}

module.exports = Article;