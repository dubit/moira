var chalk = require('chalk');
var isUndefined = require('../helpers/isUndefined');
var isPlatformOSX = require('../helpers/isPlatformOSX');

module.exports = function(processArguments) {
  var versionAndroid = false;
  var versionIOS = false;

  // By default, if no arguments are passed, Moira will try to bump both Android and iOS versions of the app.
  if(isUndefined(processArguments.ios) && isUndefined(processArguments.android)) {
    versionAndroid = true;
    if(isPlatformOSX()) {
      versionIOS = true;
    } else {
      console.log(chalk.yellow("iOS versioning only available on OS X systems!"));
      console.log(chalk.yellow("Moira will only version the Android application."));
    }
  }

  if(processArguments.ios === true) {
    if(isPlatformOSX()) {
      versionIOS = true;
    } else {
      console.log(chalk.yellow("iOS versioning only available on OS X systems!"));
      console.log(chalk.yellow("Moira will only version the Android application."));
    }
  }

  if(processArguments.android === true) {
    versionAndroid = true;
  }

  if(versionIOS) { console.log(chalk.cyan.bold("Moira will version the iOS application")); }
  if(versionAndroid) { console.log(chalk.cyan.bold("Moira will version the Android application")); }

  return {
    versionAndroid: versionAndroid,
    versionIOS: versionIOS
  }
}

