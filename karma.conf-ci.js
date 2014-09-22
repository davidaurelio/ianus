var setValues = module.exports = require('./karma.conf');
var configValues = require('./karma.conf').configValues;
var env = process.env;
var packageInfo = require('./package.json');

// Browsers to run on BrowserStack
var customLaunchers = {
  'BS_IOS_6': createDevice('ios', '6.1', 'iPhone 5'),
  'BS_IOS_latest': createDevice('ios', '7.1', 'iPhone 5S'),
  'BS_Android_2.3': createDevice('android', '2.3', 'Motorola Photon 4G'),
  'BS_Android_4.0': createDevice('android', '4.0', 'HTC One X'),
  'BS_Android_4.1': createDevice('android', '4.1', 'Motorola Razr Maxx HD'),
  'BS_Android_4.2': createDevice('android', '4.2', 'LG Nexus 4'),
  // 'BS_Android_latest': createDevice('android', 'latest', '???'),
  'BS_IE_11': createBrowser('ie', '11.0'),
  'BS_IE_10': createBrowser('ie', '10.0'),
  'BS_IE_9': createBrowser('ie', '9.0'),
  'BS_IE_8': createBrowser('ie', '8.0'),
  'BS_FF_15': createBrowser('firefox', '15'),
  'BS_FF_latest': createBrowser('firefox', 'latest'),
  'BS_Chrome_25': createBrowser('chrome', '25'),
  'BS_Chrome_latest': createBrowser('chrome', 'latest'),
  'BS_Safari_5.1': createBrowser('safari', '5.1', 'OS X', 'Snow Leopard'),
  'BS_Safari_6.1': createBrowser('safari', '6.1', 'OS X', 'Mountain Lion'),
  'BS_Safari_latest': createBrowser('safari', 'latest', 'OS X', 'Mavericks'),
  'BS_Opera_12': createBrowser('opera', '12.16')
};

var launcherNames = Object.keys(customLaunchers);

configValues.reporters = ['dots'];
configValues.customLaunchers = customLaunchers;
configValues.browsers = launcherNames;
configValues.singleRun = true;
configValues.browserDisconnectTolerance = 2;
configValues.browserNoActivityTimeout = 60000;
configValues.browserStack = {
  project: packageInfo.name,
  build: process.env.BROWSER_STACK_BUILD || packageInfo.version
};

function createDevice(os, version, device) {
  return {
    base: 'BrowserStack',
    os: os,
    os_version: version,
    device: device
  };
}

function createBrowser(name, version, os, osVersion) {
  return {
    base: 'BrowserStack',
    browser: name,
    browser_version: version,
    os: os || 'Windows',
    os_version: osVersion || 7
  };
}

if (require.main === module) {
  process.stdout.write(launcherNames.length + '\n');
}
