var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var isUndefined = require('../helpers/isUndefined');

var DEFAULT_BUILD_GRADLE_PATH = './android/app/build.gradle'

var processBuildGradleFilePath = function(processArguments) {
  var buildGradlePath = '';

  if(isUndefined(processArguments.pathToBuildGradle)) {
    buildGradlePath = path.join(process.cwd(), DEFAULT_BUILD_GRADLE_PATH);
    console.log(chalk.cyan.bold("No build gradle file path was provided, using default: " + buildGradlePath));
  } else {
    buildGradlePath = path.join(process.cwd(), processArguments.pathToBuildGradle);
  }

  if(!fs.existsSync(buildGradlePath)) {
    console.log(chalk.red.bold('Build gradle file path cannot be read! Please check that the file exists!'));
    console.log(chalk.red.bold('Path: ' + buildGradlePath));
    process.exit(1);
  }

  return buildGradlePath;
}

var processInfoPlistFilePath = function(processArguments) {
  var infoPlistFilePath = '';

  if(isUndefined(processArguments.pathToInfoPlist)) {
    console.log(chalk.red.bold('Info.plist file path is required when versioning iOS.'));
    console.log(chalk.red.bold("Provide the path to the Info.plist by passing it via '--path-to-info-plist'."));
    process.exit(1)
  }

  infoPlistFilePath = path.join(process.cwd(), processArguments.pathToInfoPlist);
  if(!fs.existsSync(infoPlistFilePath)) {
    console.log(chalk.red.bold('Info.plist file path cannot be read! Please check that the file exists!'));
    console.log(chalk.red.bold('Path: ' + infoPlistFilePath));
    process.exit(1);
  }

  return infoPlistFilePath;
}

module.exports = {
  processBuildGradleFilePath: processBuildGradleFilePath,
  processInfoPlistFilePath: processInfoPlistFilePath
}
