var execSync = require('child_process').execSync;

module.exports = function(pathToInfoPlist, syncVersion, syncBuildNumber, version, buildNumber) {
  var versionCommand = "Set :CFBundleShortVersionString " + version;
  var buildNumberCommand ="Set :CFBundleVersion " + buildNumber;

  if(syncVersion) {
    execSync('/usr/libexec/PlistBuddy -c "' + versionCommand + '" ' + pathToInfoPlist);
  }

  if(syncBuildNumber) {
    execSync('/usr/libexec/PlistBuddy -c "' + buildNumberCommand + '" ' + pathToInfoPlist);
  }
}
