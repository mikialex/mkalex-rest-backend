const Router = require('koa-router');

const AlbumRouter = new Router({
  prefix: '/album'
})

const albums = require('../controllers/album.js');
const auth = require('../controllers/auth.js');

albumRouter.get('/', albums.getalbumList);       // list albums
albumRouter.get('/admin', auth.authFilter, albums.getalbumListAdmin);    // get album content

albumRouter.patch('/album', auth.authFilter, albums.updatealbumDetail);    // change album details
albumRouter.post('/album', auth.authFilter, albums.addalbum);    // add album details
albumRouter.delete('/album', auth.authFilter, albums.deletealbum);    // add album details

module.exports = AlbumRouter