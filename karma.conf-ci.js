var setValues = module.exports = require('./karma.conf');
var configValues = require('./karma.conf').configValues;
var env = process.env;

// Use ENV vars for credentials
if (!env.SAUCE_USERNAME || !env.SAUCE_ACCESS_KEY) {
  throw Error('Provide sauce access credentials as SAUCE_USERNAME and SAUCE_ACCESS_KEY env variables.');
}

// Browsers to run on Sauce Labs
var customLaunchers = {
  'SL_IOS_5': createLauncher('iphone', '5.1'),
  'SL_IOS_7': createLauncher('iphone', '7.1'),
  'SL_Android_4.4': createLauncher('android', '4.4'),
  'SL_Android_4.3': createLauncher('android', '4.3'),
  'SL_Android_4.2': createLauncher('android', '4.2'),
  'SL_Android_4.1': createLauncher('android', '4.1'),
  'SL_Android_4.0': createLauncher('android', '4.0'),
  'SL_IE_11': createLauncher('internet explorer', '11'),
  'SL_IE_10': createLauncher('internet explorer', '10'),
  'SL_IE_9': createLauncher('internet explorer', '9'),
  'SL_IE_8': createLauncher('internet explorer', '8'),
  'SL_FF_15': createLauncher('firefox', '15'),
  'SL_FF_latest': createLauncher('firefox'),
  'SL_Chrome_15': createLauncher('chrome', '15'),
  'SL_Chrome_latest': createLauncher('chrome'),
  'SL_Safari_5': createLauncher('safari', '5'),
  'SL_Safari_latest': createLauncher('safari'),
  'SL_Opera_12': createLauncher('opera', '12')
};

var launcherNames = Object.keys(customLaunchers);
if (env.SAUCE_RANGE) {
  var range = env.SAUCE_RANGE.split(',').map(Number);
  launcherNames = launcherNames.slice(range[0], range[0] + range[1]);
}

configValues.reporters = ['dots', 'saucelabs'];
configValues.sauceLabs = {testName: 'ianus runtime environment tests'};
configValues.customLaunchers = customLaunchers;
configValues.browsers = launcherNames;
configValues.singleRun = true;
configValues.captureTimeout = 300000;

function createLauncher(name, version, platform) {
  var launcher = {
    base: 'SauceLabs',
    browserName: name
  };
  if (version) {
    launcher.version = version;
  }
  return launcher;
}

if (require.main === module) {
  process.stdout.write(launcherNames.length + '\n');
}
