const Image = require('../models/image.js');
const Auth = require('./auth.js');
const { promisify } = require('util');
const fs = require('fs');

var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

const writeFile = promisify(fs.writeFile);


class ImagesHandlers {


  static async getImageList(ctx) {
    ctx.body = await Image.getImageList();
  }

  // static async getImageDetial(ctx) {
  //   console.log(ctx.query)
  //   ctx.body = await Image.getImageDetialByUrlName(ctx.query.urlname)
  // }

  static async updateImageDetial(ctx) {
    try {
      await Image.updateImageDetial(ctx.request.body.params);
      ctx.body={result:'success'}
    } catch (error) {
      ctx.body={result:'error',message:error}
    }
  }

  static async updateImageDetial(ctx) {
    try {
      await Image.updateImageDetial(ctx.request.body.params);
      ctx.body={result:'success'}
    } catch (error) {
      ctx.body={result:'error',message:error}
    }
  }

  static async newImage(ctx) {
    const data = ctx.request.body;
    if ( await Image.isExistSameUrlname(data.urlname)) {
      ctx.body={result:'error',message:'urlname already exist'}
    } else {
        await Image.addImage(data);
        ctx.body={result:'success'}
    }
  }

  static async deleteImage(ctx) {
    const urlname = ctx.query.urlname;
    console.log(urlname);

    if ( await Image.isExistSameUrlname(urlname)) {
      await Image.deleteImage(urlname);
      ctx.body = { result: 'success' };
    } else {
      ctx.body={result:'error',message:'delete failed'}
    }

  }


}

module.exports = ImagesHandlers; 