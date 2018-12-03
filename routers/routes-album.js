const Router = require('koa-router');

const AlbumRouter = new Router({
  prefix: '/album'
})

const albums = require('../controllers/album.js');
const auth = require('../controllers/auth.js');

albumRouter.get('/', albums.getAlbumList);                               // list public albums
albumRouter.get('/admin', auth.authFilter, albums.getAlbumListAdmin);    // list public and private albums

albumRouter.patch('/album', auth.authFilter, albums.updateAlbumDetail);  // change the album details
albumRouter.post('/album', auth.authFilter, albums.addAlbum);            // create a new album
albumRouter.delete('/album', auth.authFilter, albums.deleteAlbum);       // delete an album 

module.exports = AlbumRouter