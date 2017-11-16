const Picture = require('../models/picture.js');
const Auth = require('./auth.js');
const { promisify } = require('util');
const fs = require('fs');
const writeFile = promisify(fs.writeFile);


class PicturesHandlers {


  static async getPictureList(ctx) {
    ctx.body = await Picture.getPictureList();
  }


  static async getPictureContent(ctx) {
    let picture = await Picture.getPictureContentByUrlname(ctx.query.pictureName)
    await Picture.addVisit(ctx.query.urlname)

    if (!picture) ctx.throw(404, `Not found`); // Not Found

    ctx.body = picture;
  }

  static async getPictureDetial(ctx) {
    console.log(ctx.query)
    ctx.body = await Picture.getPictureDetialByUrlName(ctx.query.urlname)
  }

  static async updatePictureDetial(ctx) {
    try {
      await Picture.updatePictureDetial(ctx.request.body.params);
      ctx.body={result:'success'}
    } catch (error) {
      ctx.body={result:'error',message:error}
    }
  }

  static async updatePictureDetial(ctx) {
    try {
      await Picture.updatePictureDetial(ctx.request.body.params);
      ctx.body={result:'success'}
    } catch (error) {
      ctx.body={result:'error',message:error}
    }
  }

  static async addPicture(ctx) {
    const data = ctx.request.body;
    if ( await Picture.isExistSameUrlname(data.urlname)) {
      ctx.body={result:'error',message:'urlname already exist'}
    } else {
        await Picture.addPicture(data);
        ctx.body={result:'success'}
    }
  }

  static async deletePicture(ctx) {
    const urlname = ctx.query.urlname;
    console.log(urlname);

    if ( await Picture.isExistSameUrlname(urlname)) {
      await Picture.deletePicture(urlname);
      ctx.body = { result: 'success' };
    } else {
      ctx.body={result:'error',message:'delete failed'}
    }

  }


}

module.exports = PicturesHandlers; 