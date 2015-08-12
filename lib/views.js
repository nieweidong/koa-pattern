'use strict';

var dirname = require('path').dirname;
var assign = require('object-assign');
var fmt = require('util').format;
var join = require('path').join;
var cons = require('co-views');
var send = require('koa-send');
var configs = {};
var renders = {};

/**
 * 模板渲染的处理，依赖co-views
 *
 * @param {Str} options 就是config，来自../configs/views.js中各个项目的配置
 * @return {Func} 模板文件服务
 * @public
 */

module.exports = function(options) {
  // root
  var base = dirname(process.mainModule.filename);

  var defaultOptions = {key: 'index',default: 'html',path: base}
  options = assign(defaultOptions, options);

  configs[options.key] = options;

  return function * views(next) {
    renders[options.key] = cons(options.path, options);

    // this.state用来传参给views
    this.state = this.state || {};

    if (this.render) {
      return yield next;
    }

    /**
     * render对应的模板
     *
     * @param {String} view
     * @param {Object} locals
     * @return {GeneratorFunction}
     * @api public
     */
    this.render = function*(view, locals) {
      var key = this.path.split('/')[1] || 'index';
      var opts = configs[key] || defaultOptions;
      var ext = opts.default;

      if (view[view.length - 1] === '/') {
        view += 'index';
      }

      locals = locals || {};
      var state = assign(locals, this.state);

      // .html后缀使用send，其他使用co-views
      // https://www.npmjs.com/package/co-views
      if (ext == 'html' && (!opts.map || (opts.map && !opts.map.html))) {
        var file = fmt('%s.%s', view, ext);
        yield send(this, join(opts.path, file));
      } else {
        this.body = yield renders[key](view, state);
      }

      this.type = 'text/html';
    }

    yield next;
  }
}
