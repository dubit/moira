var chalk = require('chalk');
var isUndefined = require('../helpers/isUndefined');

module.exports = function(processArguments) {
  var buildNumber = -1;

  if(isUndefined(processArguments.buildNumber)) {
    console.log(chalk.red.bold("Moira was configured to synchronize the build number but no build number was provided!"));
    console.log(chalk.red.bold("Please pass the build number as an argument to Moira using '--build-number' or '--buildNumber'!"));
    process.exit(1);
  }

  buildNumber = Number(processArguments.buildNumber);
  if(isNaN(buildNumber) || buildNumber <= 0) {
    console.log(chalk.red.bold("Moira was configured to synchronize the build number but an invalid build number was provided!"));
    console.log(chalk.red.bold("Please provide a valid positive integer as the value for the build number!"));
    process.exit(1);
  }

  return buildNumber;
}
