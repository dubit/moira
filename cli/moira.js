#!/usr/bin/env node
var path = require('path');
var fs = require('fs');
var chalk = require('chalk');
var argv = require('yargs').argv;
var packageJSON = require('../package.json');
var platformArgumentProcessor = require('./argumentProcessors/platformArgumentProcessor');
var buildPropertyArgumentProcessor = require('./argumentProcessors/buildPropertyArgumentProcessor');
var buildNumberArgumentProcessor = require('./argumentProcessors/buildNumberArgumentProcessor');
var versionArgumentProcessor = require('./argumentProcessors/versionArgumentProcessor');
var pathArgumentProcessor = require('./argumentProcessors/pathArgumentProcessor');
var versionAndroidCommand = require('./commands/versionAndroid');
var versionIOSCommand = require('./commands/versionIOS');

var versionIOS = false;
var versionAndroid = false;
var syncVersion = false;
var syncBuildNumber = false;
var buildNumber = -1;
var applicationVersion = '0.0.0';
var pathToBuildGradle = '';
var pathToInfoPlist = '';

console.log(chalk.cyan.bold("Running Moira v" + packageJSON.version));

var platformResult = platformArgumentProcessor(argv);
versionIOS = platformResult.versionIOS;
versionAndroid = platformResult.versionAndroid;

var buildProperties = buildPropertyArgumentProcessor(argv);
syncVersion = buildProperties.syncVersion;
syncBuildNumber = buildProperties.syncBuildNumber;

if(syncVersion) {
  applicationVersion = versionArgumentProcessor(argv);
}

if(syncBuildNumber) {
  buildNumber = buildNumberArgumentProcessor(argv);
}

if(versionAndroid) {
  pathToBuildGradle = pathArgumentProcessor.processBuildGradleFilePath(argv);
  versionAndroidCommand(pathToBuildGradle, syncVersion, syncBuildNumber, applicationVersion, buildNumber);
}

if(versionIOS) {
  pathToInfoPlist = pathArgumentProcessor.processInfoPlistFilePath(argv);
  versionIOSCommand(pathToInfoPlist, syncVersion, syncBuildNumber, applicationVersion, buildNumber);
}

chalk.reset();
