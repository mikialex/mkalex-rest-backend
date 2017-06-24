// log the request info

module.exports.middleware = async (ctx, next) => {
  console.log(ctx.method + ' ' + ctx.url);
  await next();
}