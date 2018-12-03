const Router = require('koa-router');

const AuthRouter = new Router({})

const auth = require('../controllers/auth.js');

AuthRouter.post( '/login', auth.login);            

module.exports = AuthRouter