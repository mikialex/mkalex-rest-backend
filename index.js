const Koa = require('koa');
const app = module.exports = new Koa();
const mysql = require('mysql2/promise');

const databaseInfo = require('./configs/database-info.js');
const debug = require('./utils/debugger.js');
const chalk = require('chalk');

console.log(chalk.bgBlue('starting mkalex-rest backend \n'))
debug.logblue('------database info loaded-----')
debug.logblue('database name :' + databaseInfo.database)
debug.logblue('database host :' + databaseInfo.host)
debug.logblue('database port :' + databaseInfo.port)
debug.logblue('database user :' + databaseInfo.user)
debug.logblue('---------------------------\n')


// MySQL connection pool (set up on app initialisation)
const config = {
  host: databaseInfo.host,
  port: databaseInfo.port,
  user: databaseInfo.user,
  password: databaseInfo.password,
  database: databaseInfo.database,
};
global.connectionPool = mysql.createPool(config); // put in global to pass to sub-apps
debug.logblue('connectionPool created\n')


// log the request info
app.use(async function(ctx, next) {
  // console.log(ctx);
  console.log(ctx.method + ' ' + ctx.url);
  await next();
});


// return response time in X-Response-Time header
app.use(async function responseTime(ctx, next) {
  const t1 = Date.now();
  await next();
  const t2 = Date.now();
  ctx.set('X-Response-Time', Math.ceil(t2 - t1) + 'ms');
});


// set up MySQL connection
app.use(async function mysqlConnection(ctx, next) {
  try {

    // keep copy of ctx.state.db in global for access from models
    ctx.state.db = global.db = await global.connectionPool.getConnection();
    ctx.state.db.connection.config.namedPlaceholders = true;
    // traditional mode ensures not null is respected for unsupplied fields, ensures valid JavaScript dates, etc
    // await ctx.state.db.query('SET SESSION sql_mode = "TRADITIONAL"');

    await next();

    ctx.state.db.release();

  } catch (e) {
    // note if getConnection() fails we have no this.state.db, but if anything downstream throws,
    // we need to release the connection
    if (ctx.state.db) ctx.state.db.release();
    throw e;
  }
});



//-----------------for different routes----------------------------

app.use(require('./routers/routes-article.js'));
app.use(require('./routers/routes-category.js'));
app.use(require('./routers/routes-tag.js'));



//------------------------------------------------------------------




//start listen to port
if (!module.parent) {
  try {
    app.listen(3000);
    debug.logblue(`${process.version} listening on port 3000...`);
  } catch (e) {
    console.error('port 3000 is used')
  }

}