'use strict';

/**
 * use模板文件和静态文件
 *
 * @param {Obj} koa
 * @public
 */

var path = require('path');
var assign = require('object-assign');
var serve = require('./static');
var views = require('./views');

module.exports = function(app) {
  // app即Application
  // app.init()后，app.apps、app.configs、app.staticpath被声明
  var apps = Object.keys(app.apps);

  apps.map(function(key) {
    var staticpath = app.configs.views[key].staticpath || app.staticpath;
    var viewspath = app.configs.views[key].viewspath || app.viewspath;

    // 释放静态文件路径，如：../apps/app1/testpublic
    app.use(serve(path.join(app.apps[key], staticpath), key));

    if (!app.configs.views) {
      return;
    }
    var config = app.configs.views[key];
    if (!config) {
      return;
    }
    config = assign(config, {
      key: key,
      path: path.join(app.apps[key], viewspath)
    });

    /*
      @config:
      { default: 'hbs',
        map: { hbs: 'handlebars' },
        key: 'app1',
        path: '/Users/yunyunyang/Desktop/code/koa-pattern/apps/app1/views' }

      { key: 'app2',
        path: '/Users/yunyunyang/Desktop/code/koa-pattern/apps/app2/views' }

      { key: 'app3',
        path: '/Users/yunyunyang/Desktop/code/koa-pattern/apps/app3/views' }

      { staticpath: 'testpublic',
        viewspath: 'testviews',
        key: 'demo',
        path: '/Users/yunyunyang/Desktop/code/koa-pattern/apps/demo/testviews' }
     */
    app.use(views(config));
  })
};
