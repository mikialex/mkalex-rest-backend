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

  static async CheckToken(token) {
    return (await User.checkUserToken(token)).length !== 0
  }

  static async needAuthToken(ctx, next) {
    console.log('check token')
    const token = ctx.request.body.params.token;
    if (await Auth.CheckToken(token)) {
      console.log('next')
      await next();
    } else {
      ctx.body={result:'authfail'} 
    }
  }

}

module.exports = Auth;