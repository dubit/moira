var fs = require('fs');

module.exports = function(pathToBuildGradle, syncVersion, syncBuildNumber, version, buildNumber) {
  var gradleFileContent = fs.readFileSync(pathToBuildGradle, 'utf8');

  var versionPattern = '$1' + version;
  var buildNumberPattern = '$1' + buildNumber;

  if(syncVersion) {
    gradleFileContent = gradleFileContent.replace(/(versionName ")(.+?)(?=")/, versionPattern);
  }

  if(syncBuildNumber) {
    gradleFileContent = gradleFileContent.replace(/(versionCode )(.+?)/, buildNumberPattern);
  }

  fs.writeFileSync(pathToBuildGradle, gradleFileContent);
}
