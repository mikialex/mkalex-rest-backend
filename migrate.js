const Article = require('./models/article.js');
const cast = require('./utils/cast.js');
const chalk = require('chalk');
const mysql = require('mysql2/promise');
const md5 = require("blueimp-md5");


const fs = require('fs');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const deleteFile = promisify(fs.unlink);
const path = require('path');
const sharp = require('sharp');

let databaseInfo;
var arguments = process.argv.splice(2);
if (arguments[0] === 'dev') {
  databaseInfo = require('./configs/database-dev.js');
  console.log(chalk.bgBlue('use dev database \n'))
} else {
  databaseInfo = require('./configs/database-prod.js');
  console.log(chalk.bgBlue('use online database \n'))
}

const config = {
  host: databaseInfo.host,
  port: databaseInfo.port,
  user: databaseInfo.user,
  password: databaseInfo.password,
  database: databaseInfo.database,
};

async function migrate() {
  global.connectionPool = mysql.createPool(config); // put in global to pass to sub-apps
  global.db = await global.connectionPool.getConnection();
  global.db.q = async function (sql, params) {
    return cast.fromMysql(await global.db.query(sql, params));
  }
  global.db.connection.config.namedPlaceholders = true;

  let sql =
    `SELECT * FROM article 
      Order By create_time Desc`;

  const result = await global.db.q(sql);
  let regex = /{#base#}[A-Za-z0-9_]+.[a-z]+/g
  result.forEach(async article => {
    let ret = [],
      crt;
    while ((crt = regex.exec(article.content)) !== null) {
      ret = ret.concat(crt)
    };
    console.log(ret);
    const imageFromBase = path.resolve(__dirname, './content/') + '/';
    const imageToBase = path.resolve(__dirname, './static/image/') + '/';
    // console.log(imageToBase);
    let contentConvertTemp = article.content;
    ret.forEach(async imgStr => {
      if (imgStr.split('.')[1] === 'pdf') return;
      const name = Date.now() + imgStr.replace('{#base#}', '');
      const storageName = md5(name + Math.random()) + '-' + name;
      const realImageName = storageName.split('.')[0];
      let imageWritePath = imageToBase + storageName;
      let imageOriginPath = imageFromBase + article.u_name + '/' + imgStr.replace('{#base#}', '');;

      console.log(imgStr);
      let imageBuffer = await readFile(imageOriginPath);
      const imageMetaData = await sharp(imageBuffer).metadata();
      await sharp(imageBuffer).toFile(imageWritePath);
      await sharp(imageBuffer)
        .resize(200, 200)
        .max()
        .toFile(imageToBase + realImageName + '_overview' + '.jpg');
      let sqli =
        `
      INSERT INTO image (storage_name, name,upload_time,width,height) 
      VALUES (:storage_name, :name, :upload_time,:width,:height);
      `
      let info = {
        storage_name: storageName,
        name: storageName.substring(34 + 12),
        upload_time: storageName.substring(33, 34 + 12),
        width: imageMetaData.width,
        height: imageMetaData.height,
      }
      console.log(info);
      await global.db.query(sqli, info);

      const updateContent = `
      UPDATE article SET content=:content WHERE u_name=:urlname;
      `
      contentConvertTemp = contentConvertTemp.replace(imgStr.replace('{#base#}', ''), storageName);
      let updat = {
        content: contentConvertTemp,
        urlname:article.u_name
      }
      await global.db.query(updateContent, updat);

      console.log(imgStr.replace('{#base#}', ''))
      console.log(storageName);
      // console.log(contentConvertTemp);
      
    })

  })
  db.release();
}

migrate();




