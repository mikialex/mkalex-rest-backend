const Image = require('../models/image.js');
const Auth = require('./auth.js');

var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

class ImagesHandlers {

  static async getImageList(ctx) {
    ctx.body = await Image.getImageList();
  }

  static async newImage(ctx) {
    const data = ctx.request.body;
    console.log(ctx.req.file);
    console.log('data', data);
    const storeInfo = ctx.req.file;
    const imageInfo = {
      storage_name: storeInfo.filename,
      name: storeInfo.filename.substring(34 + 12),
      upload_time: storeInfo.filename.substring(33, 34 + 12),
    }
    await Image.addImage(imageInfo);
    const image = imageInfo.storage_name;
    ctx.body = { result: 'success', imageUrl: image };
  }

  static async deleteImage(ctx) {
    const imagePathName = ctx.query.imagePathName;
    console.log(imagePathName);
    await Image.deleteImage({ imagePathName });
    ctx.body = { result: 'success' };

  }

}

module.exports = ImagesHandlers; 