
const Router = require('koa-router');
const multer = require('koa-multer');
const upload = multer({ dest: 'uploads/' });

const ImageRouter = new Router({
  prefix: '/images'
})

const image = require('../controllers/image.js');
const auth = require('../controllers/auth.js');


ImageRouter.get('/', image.getImageList);
ImageRouter.post('/image', upload.single('image'), auth.tokenChecker(image.newImage));
ImageRouter.patch('/image', auth.tokenChecker(image.updateImage));
ImageRouter.delete('/image', auth.tokenChecker(image.deleteImage));

module.exports = ImageRouter