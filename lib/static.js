'use strict';

/**
 * 释放静态文件路径；
 * 如../apps/demo/testpublic或者../apps/app1/public之类
 *
 * @param {Str} root 绝对路径地址；
 *                   如xxx/koa-pattern/apps/demo/testpublic或者xxx/koa-pattern/apps/app1/public之类
 * @param {Str} route 项目名称；
 *                     如app1/app2/app3/demo
 * @param {Obj} opts
 * @return {Func} 静态文件服务
 * @public
 */

var resolve = require('path').resolve;
var send = require('koa-send');
var routes = {};

module.exports = function(root, route, opts) {
  opts = opts || {};
  route = route || '/';

  // options
  opts.root = resolve(root);
  opts.index = opts.index || 'index.html';

  routes[route] = opts;
  return function * serve(next) {
    yield* next;
    var route = this.path.split('/')[1] || '/';
    if (this.method != 'HEAD' && this.method != 'GET') return;
    // response is already handled
    if (this.body != null || this.status != 404) return;

    yield send(this, this.path.slice(1 + route.length) || '/', routes[route]);
  };
};
