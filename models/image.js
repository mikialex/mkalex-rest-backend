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
    let sql =
      `SELECT * FROM image Order By upload_time Desc`;
    const rawResult = await global.db.q(sql);
    let images = rawResult;
    return images;
  }

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
      .toFile(imageBase + realImageName + '_overview' + '.jpg');

  }

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