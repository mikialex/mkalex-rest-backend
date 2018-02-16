const cast = require('../utils/cast.js');

const fs = require('fs');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const deleteFile = promisify(fs.unlink);

const path = require('path');
const sharp = require('sharp');

class Image {

  static timeCast(time) {
    return time.toISOString().substring(0, 10)
  }

  static async getImageList() {
    // let sql =
    //   `SELECT *
    //   FROM image left join article_with_image
    //   on image.id = article_with_tag.image_id
    //   Order By upload_time Desc`;
    let sql =
    `SELECT * FROM image Order By upload_time Desc`;

    const rawResult = await global.db.q(sql);

    let images = rawResult;

    // function hasArticle(name) {
    //   let find = -1;
    //   articles.forEach((article, index) => {
    //     if (article.urlname === name) {
    //       find = index;
    //     }
    //   })
    //   return find;
    // }

    // rawResult.forEach(item => {
    //     let idx = hasArticle(item.u_name)
    //     if (idx !== -1) {
    //       if (item.tag !== null) {
    //         articles[idx].tags.push(item.tag)
    //       }
    //     } else {
    //       articles.push({
    //         urlname: item.u_name,
    //         title: item.title,
    //         sub_title: item.sub_title,
    //         page_view: item.visit,
    //         has_cover: item.has_cover,
    //         publish_time: Article.timeCast(item.create_time),
    //         is_recommended: item.is_recommended,
    //         usefor: item.usefor,
    //         tags: (item.tag !== null) ? [item.tag] : []
    //       })

    //     }
    //   });
    return images;
  }

  // static async getArticleDetailByUrlName(urlname) {
  //   let sql =
  //     `SELECT * FROM article left join article_with_tag
  //   on article.u_name =article_with_tag.article
  //   where article.u_name=:urlname`;

  //   const articles = await global.db.q(sql, { urlname });
  //   let tags = [];
  //   articles.forEach(article => {
  //     if (article.tag !== null) {
  //       tags.push(article.tag);
  //     }
  //   })
  //   let article = articles[0];
  //   if (article && article.is_active) {
  //     return {
  //       urlname: article.u_name,
  //       title: article.title,
  //       sub_title: article.sub_title,
  //       page_view: article.visit,
  //       has_cover: article.has_cover,
  //       publish_time: Article.timeCast(article.create_time),
  //       content: article.content,
  //       is_recommended: article.is_recommended,
  //       usefor: article.usefor,
  //       tags: tags
  //     };
  //   }
  // }


  // static async getAricleTagList(urlname) {
  //   let list = await global.db.q('Select tag From article_with_tag Where article = :urlname', { urlname })
  //   return list
  // }

  // static async addTag(urlname, tag) {
  //   let tagExist = await global.db.q('Select article From article_with_tag Where tag = :tag and article=:urlname', { urlname, tag })

  //   console.log(tagExist)    //to fix
  //   if (tagExist.length === 0) {
  //     let sql =
  //       `
  //     INSERT INTO article_with_tag
  //     (id,article,tag)
  //     VALUES 
  //     (null,:urlname,:tag)
  //     `
  //     await global.db.query(sql, { urlname, tag })
  //   }

  // }

  // static async removeTag(urlname, tag) {
  //   await global.db.query('delete from article_with_tag where article=:urlname and tag=:tag', { urlname, tag })
  // }


  static async addImage(imageInfo) {
    console.log('imageInfo', imageInfo);
    const imageBase = path.resolve(__dirname, '../static/image/') + '/';
    const imagePath = imageBase + imageInfo.storage_name;
    let realImageName = imageInfo.storage_name.split('.')[0];
    let imageBuffer = await readFile(imagePath);
    const imageMetaData = await sharp(imageBuffer).metadata();
    let sql =
      `
      INSERT INTO image (storage_name, name,upload_time,width,height) 
      VALUES (:storage_name, :name, :upload_time,:width,:height);
      `
    imageInfo.width = imageMetaData.width;
    imageInfo.height = imageMetaData.height;
    await global.db.query(sql, imageInfo);
    await sharp(imageBuffer)
      .resize(200, 200)
      .max()
      .toFile(imageBase + realImageName + '_overview' +'.jpg');

  }

  // static async updateArticleDetail(newArticleDetail) {
  //   // console.log(newArticleDetail)
  //   let sql =
  //     `
  //     UPDATE article 
  //     SET content=:content ,u_name=:urlname ,usefor=:usefor ,is_active=:is_active,
  //     title=:title, sub_title=:sub_title, visit=:visit, has_cover=:has_cover,
  //     create_time=:create_time, is_recommended=:is_recommended
  //     WHERE u_name=:urlname
  //     `
  //   await global.db.query(sql, newArticleDetail)
  // }

  static async deleteImage(conf) {
    console.log(conf);
    let sql =
      `
      delete from image where storage_name=:imagePathName
      `
    let ret = await global.db.query(sql, conf)
    const basePath = path.resolve(__dirname, '../static/image/') + '/';
    await deleteFile(basePath + conf.imagePathName);
    let realImageName = conf.imagePathName.split('.')[0];
    await deleteFile(basePath + realImageName + '_overview.jpg');
  }

}

module.exports = Image;