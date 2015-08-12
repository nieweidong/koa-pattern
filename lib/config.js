'use strict';

/**
 * 获取配置文件夹(默认configs)的各个配置
 *
 * @param {Str} Configs path, default 'configs'
 * @return {Obj}
           {
              backend: { redis: {}, mysql: {} },
              global:
              { APPPATHNAME: 'apps',
                STATICPATHNAME: 'public',
                VIEWSPATHNAME: 'views',
                port: 8088 },
              logger:
              { logDatePattern: '-yyyy-MM-dd.log',
                logType: [ 'error', 'info', 'debug' ],
                logRoot: '/Users/yunyunyang/Desktop/code/koa-pattern' },
              views:
              { demo: { staticpath: 'testpublic', viewspath: 'testviews' },
                app1: { default: 'hbs', map: [Object] },
                app2: {},
                app3: {} }
            }
 * @public
 */

var path = require('path');
var fs = require('fs');
var assign = require('object-assign');
var configs = {};

var requireConfig = function(configPath) {
  var config = require(configPath);
  if (typeof config != 'object') {
    return {};
  }
  return config;
}

module.exports = function(name) {
  name = name || 'configs';
  var root = path.join(path.dirname(process.mainModule.filename), name);

  if (!fs.existsSync(root)) {
    return;
  }

  // read configs
  var files = fs.readdirSync(root);
  files.map(function(file) {
    if (file[0] === '.') {
      return;
    }
    if (path.extname(file) === '.js') {
      var config = requireConfig(path.join(root, file));
      var key = path.basename(file, '.js');
      configs[key] = config;
    }
  });
  return configs;
}
