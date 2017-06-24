const chalk = require('chalk');

class Debugger {
    static log() {
    }
  
    static logblue(message) {
      console.log(chalk.blue(message))
    }

}


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

module.exports = Debugger;