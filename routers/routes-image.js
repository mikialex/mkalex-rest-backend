
const Router = require('koa-router');
const multer = require('koa-multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'static/image/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
})

const upload = multer({ storage: storage });

const ImageRouter = new Router({
  prefix: '/images'
})

const image = require('../controllers/image.js');
const auth = require('../controllers/auth.js');


ImageRouter.get('/', image.getImageList);
ImageRouter.post('/image', auth.authFilter, upload.single('image'),image.newImage);
// ImageRouter.patch('/image', auth.authFilter, image.updateImage);
ImageRouter.delete('/image', auth.authFilter, image.deleteImage);

module.exports = ImageRouter