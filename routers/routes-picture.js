
const Router = require('koa-router');

const PictureRouter = new Router({
  prefix: '/pictures'
})

const picture = require('../controllers/picture.js');
const auth = require('../controllers/auth.js');


router.get(      '/',        picture.getPictureList);       // list articles
router.get(      '/picture', picture.getPicture);    // get article details
router.patch(    '/picture', auth.needAuthToken,picture.updatePicture);    // change article details
router.post(     '/picture', auth.needAuthToken,picture.newPicture);    // add article details
router.delete(   '/picture', auth.needAuthToken,picture.deletePicture);    // add article details

module.exports = router