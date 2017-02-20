var chalk = require('chalk');
var isUndefined = require('../helpers/isUndefined');
var isPlatformOSX = require('../helpers/isPlatformOSX');

module.exports = function(processArguments) {
  var bumpAndroid = false;
  var bumpIOS = false;

  // By default, if no arguments are passed, Moira will try to bump both Android and iOS versions of the app.
  if(isUndefined(processArguments.ios) && isUndefined(processArguments.android)) {
    bumpAndroid = true;
    if(isPlatformOSX()) {
      bumpIOS = true;
    } else {
      console.log(chalk.yellow("iOS versioning only available on OS X systems!"));
      console.log(chalk.yellow("Moira will only version the Android application."));
    }
  } else if(processArguments.ios === true) {
    if(isPlatformOSX()) {
      bumpIOS = true;
    } else {
      console.log(chalk.yellow("iOS versioning only available on OS X systems!"));
      console.log(chalk.yellow("Moira will only version the Android application."));
    }
  } else if(processArguments.android === true) {
    bumpAndroid = true;
  }

  if(bumpIOS) { console.log(chalk.cyan.bold("Moira will version the iOS application")); }
  if(bumpAndroid) { console.log(chalk.cyan.bold("Moira will version the Android application")); }

  return {
    bumpAndroid: bumpAndroid,
    bumpIOS: bumpIOS
  }
}

