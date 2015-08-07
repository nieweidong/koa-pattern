'use strict';

/**
 * 获取项目文件夹中(默认apps)的各个项目(如app1)路径
 *
 * @param {Str} App path, default 'apps'
 * @return {Obj} { demo: '/Users/yunyunyang/Desktop/code/koa-pattern/apps/demo',
                    app1: '/Users/yunyunyang/Desktop/code/koa-pattern/apps/app1',
                    app2: '/Users/yunyunyang/Desktop/code/koa-pattern/apps/app2',
                    app3: '/Users/yunyunyang/Desktop/code/koa-pattern/apps/app3' }
 * @public
 */

var path = require('path');
var fs = require('fs');

module.exports = function(name) {
  name = name || 'apps';
  var dirname = path.dirname(process.mainModule.filename);
  var appPath = path.join(dirname, name);
  if (fs.existsSync(appPath)) {
    var dirs = fs.readdirSync(appPath);
    var apps = {};
    dirs.map(function(value) {
      if (value.indexOf('.') != 0) {
        apps[value] = path.join(dirname, name, value);
      }
    });
    /*
      @return:

      @returns 当没有找到这些路径时返回[];
     */
    return apps;
  } else {
    return [];
  }
};
