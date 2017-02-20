#!/usr/bin/env node
var path = require('path');
var fs = require('fs');
var chalk = require('chalk');
var argv = require('yargs').argv;
var packageJSON = require('../package.json');
var platformArgumentProcessor = require('./argumentProcessors/platformArgumentProcessor');

var versionIOS = false;
var versionAndroid = false;

console.log(chalk.cyan.bold("Running Moira v" + packageJSON.version));

var platformResult = platformArgumentProcessor(argv);
versionIOS = platformResult.versionIOS;
versionAndroid = platformResult.versionAndroid;
