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
    // if (ctx.method === 'POST') {
    //   token = ctx.request.body.token;
    // } else if (ctx.method === 'DELETE') {
    //   token = ctx.query.token;
    // } else if (ctx.method === 'PATCH') {
    //   token = ctx.request.body.params.token
    // } else {
    //   token = ctx.query.token;
    // }
    token = ctx.query.token;
    console.log(token)
    if (token) {
      return (await User.checkUserToken(token)).length !== 0
    } else {
      return false
    }
  }

  static tokenChecker(handler) {
    return async function (ctx) {
      if (await Auth.CheckToken(ctx)) {
        console.log('token check passed')
        await handler(ctx)
      } else {
        console.log('token check failed')
        ctx.body={result:'authfail'} 
      }
    } 
  }
   


}

module.exports = Auth;