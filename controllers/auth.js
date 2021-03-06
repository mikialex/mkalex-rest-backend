const User = require('../models/user.js');

class Auth {

  static async login(ctx) {
    const data = ctx.request.body;
    const userInfos = await User.getUserAuthInfo(data.username);

    if (userInfos.length === 1) {
      const userInfo = userInfos[0];
      if (data.password === userInfo.password) {
        const token = Math.random() + '';
        User.setUserToken(data.username,token)
        ctx.body = { result:'success',token: token};
      } else {
        ctx.body = { result:'wrong',message: 'auth fail' };
      }
    } else { 
      ctx.body = { result:'wrong',message: 'auth fail' };
    }

  }

  static async CheckToken(ctx) {
    let token='';
    token = ctx.query.token;
    console.log(token)
    if (token) {
      return (await User.checkUserToken(token)).length !== 0
    } else {
      return false
    }
  }

  static async authFilter(ctx, next) {
    if (await Auth.CheckToken(ctx)) {
      console.log('token check passed')
      await next();
    } else {
      console.log('token check failed')
      ctx.body = { result: 'authfail' }
    }
  }
   
}

module.exports = Auth;