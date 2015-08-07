'use strict';
var path = require('path');

module.exports = {
  logDatePattern: '-yyyy-MM-dd.log', // 生成的日志文件名称
  logType: ['error', 'info', 'debug'], // winston支持的levels
  logRoot: path.dirname(process.mainModule.filename), // logs目录默认在server.js同级
}
