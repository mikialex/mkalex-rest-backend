const Album = require('../models/album.js');

class AlbumsHandlers {

  static async getAlbumList(ctx) {
    ctx.body = await Album.getAlbumList();
  }

  static async getArticleListAdmin(ctx) {
    ctx.body = await Article.getAlbumListAdmin();
  }

  static async createAlbum(ctx) {
    const data = ctx.request.body;
    await Album.createAlbum(data);
    ctx.body={result:'success'}
  }

  static async deleteAlbum(ctx) {
    const data = ctx.request.body;
    await Album.deleteAlbum(data);
    ctx.body={result:'success'}
  }

  static async updateAlbumDetail(ctx) {
    try {
      await Album.updateAlbum(ctx.request.body);
      ctx.body={result:'success'}
    } catch (error) {
      ctx.body={result:'error',message:error}
    }
  }

}

module.exports = AlbumsHandlers; 