const databaseInfo = require('./database-info');

console.log(databaseInfo.password)

const Koa = require('koa');
const app = module.exports = new Koa();
const mysql = require('mysql');

// MySQL connection pool (set up on app initialisation)
const config = {
    host:     databaseInfo.host,
    port:     databaseInfo.port,
    user:     databaseInfo.user,
    password: databaseInfo.password,
    database: databaseInfo.database,
};
global.connectionPool = mysql.createPool(config); // put in global to pass to sub-apps

app.use(async function(ctx, next) {
    // console.log(ctx);
    console.log(ctx.method + ' ' + ctx.url);
    await next();
});

app.use(async function(ctx) {
  ctx.body = 'Hello World2';
});

if (!module.parent) app.listen(3000);
console.info(`${process.version} listening on port 3000`);