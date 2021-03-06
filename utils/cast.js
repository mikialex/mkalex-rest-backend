class Cast {
  //Cast query results for MySQL BIT(1) / TINYINT(1) fields from MySQL numeric values to JavaScript
  //boolean values.
  static fromMysql(result) {  
    const [rows, fields] = result;
    const rowsCast = rows.map(row => {
      fields.forEach(field => { // note 0x01 = TINYINT, 0x10 = BIT; how best to access mysql.Types from here?
        const boolean = (field.columnType == 0x01 || field.columnType == 0x10) && field.columnLength == 1;
        if (boolean) row[field.name] = row[field.name] === null ? null : row[field.name] == 1;
      });
      return row; 
    });

    let temp = [rowsCast];
    let a = temp[0];
    // let ret = [];
    // console.log(temp[0]['TextRow']);

    // for (let rowName in temp) {
    //   console.log(rowName);
    // }

    // return temp[0];
    return a;
  }
}

module.exports = Cast;