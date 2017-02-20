var chalk = require('chalk');
var isUndefined = require('../helpers/isUndefined');

module.exports = function(processArguments) {
  var syncVersion = false;
  var syncBuildNumber = false;

  // By default, if no arguments are passed, Moira will sync both the build number and the semver.
  if(isUndefined(processArguments.syncBuildNumber) && isUndefined(processArguments.syncSemver)) {
    syncVersion = true;
    syncBuildNumber = true;
  }

  if(processArguments.syncSemver === true) {
    syncVersion = true;
  }

  if(processArguments.syncBuildNumber === true) {
    syncBuildNumber = true;
  }

  if(syncVersion) {
    console.log(chalk.cyan.bold("Moira will synchronize the semver of the application"));
  } else {
    console.log(chalk.yellow.bold("Moira will not synchronize the semver of the application"));
  }

  if(syncBuildNumber) {
    console.log(chalk.cyan.bold("Moira will synchronize the build number of the application"));
  } else {
    console.log(chalk.yellow.bold("Moira will not synchronize the build number of the application"));
  }

  return {
    syncVersion: syncVersion,
    syncBuildNumber: syncBuildNumber
  }
}

