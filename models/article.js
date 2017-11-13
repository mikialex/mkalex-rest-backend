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
            tags: []
          })
        }
      }
    });
    return articles;
  }


  static async getDetailByUrlname(urlname) {
    const result = await global.db.query('Select content From article Where u_name = :urlname', {
      urlname
    });
    let [articles] = cast.fromMysql(result);
    const article = articles[0];
    return article;
  }

  static async getTagsByUrlname(urlname) {
    const result = await global.db.query('Select tag From article_with_tag Where article = :urlname', {
      urlname
    });
    let [tags] = cast.fromMysql(result);
    return tags;
  }

  static async addVisit(urlname) {
    let old = await global.db.query('Select visit From article Where u_name = :urlname', { urlname })
    let [oldvisit] = cast.fromMysql(old);
    console.log(oldvisit[0].visit)    //to fix
    let newvisit = oldvisit[0].visit + 1;
    await global.db.query('update article set visit = :newvisit where u_name=:urlname', { urlname, newvisit })
  }


}

module.exports = Article;