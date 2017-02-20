#!/usr/bin/env node
var path = require('path');
var fs = require('fs');
var chalk = require('chalk');
var argv = require('yargs').argv;
var packageJSON = require('../package.json');
var platformArgumentProcessor = require('./argumentProcessors/platformArgumentProcessor');
var buildPropertyArgumentProcessor = require('./argumentProcessors/buildPropertyArgumentProcessor');

var versionIOS = false;
var versionAndroid = false;
var syncVersion = false;
var syncBuildNumber = false;

console.log(chalk.cyan.bold("Running Moira v" + packageJSON.version));

var platformResult = platformArgumentProcessor(argv);
versionIOS = platformResult.versionIOS;
versionAndroid = platformResult.versionAndroid;

var buildProperties = buildPropertyArgumentProcessor(argv);
syncVersion = buildProperties.syncVersion;
syncBuildNumber = buildProperties.syncBuildNumber;
