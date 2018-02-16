const Image = require('../models/image.js');
const Auth = require('./auth.js');

var multer = require('multer')
var upload = multer({ dest: 'uploads/' })


class ImagesHandlers {


  static async getImageList(ctx) {
    ctx.body = await Image.getImageList();
  }

  // static async getImageDetial(ctx) {
  //   console.log(ctx.query)
  //   ctx.body = await Image.getImageDetialByUrlName(ctx.query.urlname)
  // }

  // static async updateImageDetial(ctx) {
  //   try {
  //     await Image.updateImageDetial(ctx.request.body.params);
  //     ctx.body={result:'success'}
  //   } catch (error) {
  //     ctx.body={result:'error',message:error}
  //   }
  // }

  // static async updateImageDetial(ctx) {
  //   try {
  //     await Image.updateImageDetial(ctx.request.body.params);
  //     ctx.body={result:'success'}
  //   } catch (error) {
  //     ctx.body={result:'error',message:error}
  //   }
  // }

  static async newImage(ctx) {
    const data = ctx.request.body;
    console.log(ctx.req.file);
    console.log('data', data);
    const storeInfo = ctx.req.file;
    const imageInfo = {
      storage_name:storeInfo.filename,
      name: storeInfo.filename.substring(13),
      upload_time: storeInfo.filename.substring(0,13),
    }
    await Image.addImage(imageInfo);
    const image = imageInfo.storage_name;
    ctx.body = { result: 'success', imageUrl: image };
  }

  static async deleteImage(ctx) {
    const imagePathName = ctx.query.imagePathName;
    console.log(imagePathName);
    await Image.deleteImage({ imagePathName});
    ctx.body = { result: 'success' };

  }


}

module.exports = ImagesHandlers; 