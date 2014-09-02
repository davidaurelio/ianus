exports = module.exports = setValues;
function setValues(config) {
  configValues.logLevel = config.LOG_INFO;
  config.set(configValues);
}

var configValues = exports.configValues = {
  basePath: '',
  frameworks: ['browserify', 'mocha', 'referee'],
  files: ['test.js'],
  preprocessors: {'test.js': 'browserify'},
  reporters: ['progress'],
  port: 9876,
  colors: true,
  autoWatch: true,
  browsers: ['PhantomJS', 'Firefox'],
  singleRun: false
};
