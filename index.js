const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = module.exports = new Koa();
const mysql = require('mysql2/promise');
const compress = require('koa-compress');

const cast = require('./utils/cast.js');
const debug = require('./utils/debugger.js');
const chalk = require('chalk');

let databaseInfo;
var arguments = process.argv.splice(2);
if (arguments[0] === 'dev') {
   databaseInfo = require('./configs/database-info-dev.js');
   console.log(chalk.bgBlue('use dev database \n'))
} else {
   databaseInfo = require('./configs/database-info-prod.js');
   console.log(chalk.bgBlue('use online database \n'))
}




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


//-----------------for different middlewares----------------------------
app.use(bodyParser());
app.use(require('./middlewares/request-consolelog.js').middleware)
app.use(require('./middlewares/response-time.js').middleware)
app.use(async (ctx, next) => {
  await next();
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

})
app.use(compress({}))
//------------------------------------------------------------------


// set up MySQL connection
app.use(async function mysqlConnection(ctx, next) {
  try {

    // keep copy of ctx.state.db in global for access from models
    ctx.state.db = global.db = await global.connectionPool.getConnection();

    global.db.q = async function (sql, params) {
      return cast.fromMysql(await global.db.query(sql, params));
    }

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
const authRouter=require('./routers/routes-auth.js')
const articleRouter = require('./routers/routes-article.js')
const tagRouter = require('./routers/routes-tag.js') 

app.use(authRouter.routes())
  .use(authRouter.allowedMethods());
app.use(articleRouter.routes())
  .use(articleRouter.allowedMethods());
  app.use(tagRouter.routes())
    .use(tagRouter.allowedMethods());
// app.use(require('./routers/routes-tag.js'));

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