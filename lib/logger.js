'use strict';

var path = require('path');
var winston = require('winston');
var fs = require('fs');
var mkdirp = require('mkdirp');
var assign = require('object-assign');

var createLogger = function(options) {
  var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.DailyRotateFile)(options)
    ]
  });
  return logger;
};

module.exports = function(options) {
  options = options || {};
  var defaultOptions = {
    app: 'app',
    levels: options.logType,
    winston: {
      datePattern: options.logDatePattern
    },
    root: options.logRoot
  }
  options = assign(defaultOptions, options);
  var logsPath = path.join(options.root, 'logs', options.app);
  if (!fs.existsSync(logsPath)) {
    mkdirp.sync(logsPath);
  }
  var loggers = {};
  options.levels.map(function(level) {
    var winstonOptions = assign(options.winston, {
      filename: path.join(logsPath, level)
    });
    loggers[level] = createLogger(winstonOptions)[level];
  });
  return loggers;
};
