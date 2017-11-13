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
    
  }

  static async preflight(ctx) {
    ctx.status = 200;
  }

}

module.exports = Auth;