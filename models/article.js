const cast = require('../utils/cast.js');

class Article {

  static async getArticleList() {
    let sql =
      `SELECT u_name,title,sub_title,visit,has_cover,create_time,tag
      FROM article left join article_with_tag
      on article.u_name =article_with_tag.article
      where article.usefor='article'
      Order By create_time Desc`;

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
          console.log(articles[idx])
          articles[idx].tags.push(item.tag)
        }
      } else {
        if (item.tag !== null) {
          articles.push({
            urlname: item.u_name,
            title: item.title,
            sub_title: item.sub_title,
            page_view: item.visit,
            has_cover: item.has_cover,
            publish_time: item.create_time,
            is_recommended: item.is_recommended,
            tags: [item.tag]
          })
        } else {
          articles.push({
            urlname: item.u_name,
            title: item.title,
            sub_title: item.sub_title,
            page_view: item.visit,
            has_cover: item.has_cover,
            publish_time: item.create_time,
            is_recommended: item.is_recommended,
            tags: []
          })
        }
      }
    });
    return articles;
  }


  static async getArticleContentByUrlname(urlname) {
    const articles = await global.db.q('Select content From article Where u_name = :urlname', {
      urlname
    });
    return articles[0];
  }

  static async getArticleDetialByUrlName(urlname) {
    let sql =
      `SELECT * FROM article left join article_with_tag
    on article.u_name =article_with_tag.article
    where article.usefor='article'
    and article.u_name=:urlname`;

    const articles = await global.db.q(sql, { urlname });
    let tags = [];
    articles.forEach(article => {
      tags.push(article.tag);
    })
    let article = articles[0];
    // console.log(article)
    if (article) {
      return {
        urlname: article.u_name,
        title: article.title,
        sub_title: article.sub_title,
        page_view: article.visit,
        has_cover: article.has_cover,
        publish_time: article.create_time,
        content: article.content,
        is_recommended: article.is_recommended,
        tags: tags
      };
    }
  }

  static async addVisit(urlname) {
    let old = await global.db.query('Select visit From article Where u_name = :urlname', { urlname })
    let [oldvisit] = cast.fromMysql(old);
    console.log(oldvisit[0].visit)    //to fix
    let newvisit = oldvisit[0].visit + 1;
    await global.db.query('update article set visit = :newvisit where u_name=:urlname', { urlname, newvisit })
  }


  static async addArticle(newArticleDetial) {
    console.log(newArticleDetial)
    let sql =
      `
      INSERT INTO article 
      (u_name,title,sub_title,visit,has_cover,create_time,is_recommended,content)
      VALUES 
      (:urlname,:title,:sub_title,:visit,:has_cover,:create_time,:is_recommended,:content)
      `
    await global.db.query(sql, newArticleDetial)
  }

  static async updateArticleDetial(newArticleDetial) {
    let sql =
      `
    UPDATE article 
    SET content=:content ,u_name=:urlname ,
    title=:title, sub_title=:sub_title, visit=:visit, has_cover=:has_cover,
    create_time=:create_time, is_recommended=:is_recommended
    WHERE u_name=:urlname

    `
    await global.db.query(sql, newArticleDetial)
  }

  static async isExistSameUrlname(urlname) {
    let sql =
      `
    select u_name from article where u_name=:urlname
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
      delete from article where u_name=:urlname
      `
    let ret = await global.db.query(sql, { urlname })
  }

}

module.exports = Article;