var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var isUndefined = require('../helpers/isUndefined');

var DEFAULT_VERSION_SOURCE_PATH = './package.json';

module.exports = function(processArguments) {
  var applicationVersion = '0.0.0';
  var applicationVersionSourcePath = '';

  if(isUndefined(processArguments.versionSource)) {
    applicationVersionSourcePath = path.join(process.cwd(), DEFAULT_VERSION_SOURCE_PATH);
    console.log(chalk.cyan.bold("No version source path was provided, using default: " + applicationVersionSourcePath));
  }

  if(!fs.existsSync(applicationVersionSourcePath)) {
    console.log(chalk.red.bold("Version source path cannot be read! Please check that the file exists!"))
    console.log(chalk.red.bold("Path: " + applicationVersionSourcePath));
    process.exit(1);
  }

  var applicationVersionSourceFileContent = fs.readFileSync(applicationVersionSourcePath, 'utf8');
  var parsedContent = {};
  try {
    parsedContent = JSON.parse(applicationVersionSourceFileContent);
  } catch(err) {
    console.log(chalk.red.bold('Could not parse JSON file: ' + applicationVersionSourcePath));
    console.log(chalk.red.bold('Error:'));
    console.log(chalk.red.bold(err));
    process.exit(1);
  }

  if(isUndefined(parsedContent.version)) {
    console.log(chalk.red.bold('File: ' + applicationVersionSourcePath));
    console.log(chalk.red.bold('did not contain a version field. Make sure there is a top level version field in the JSON content'));
    process.exit(1);
  }

  applicationVersion = parsedContent.version;
  console.log(chalk.cyan.bold("Moira will use the following value for semver: " + applicationVersion));
  return applicationVersion;
}
