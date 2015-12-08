'use strict';

// base
var util = require('util');
var http = require('http');

// ext
var koa = require('koa');
var bodyParser = require('koa-bodyparser'); // https://www.npmjs.com/package/koa-bodyparser
var json = require('koa-json'); // https://www.npmjs.com/package/koa-json
var logger = require('koa-logger'); // https://github.com/koajs/logger
var jsonp = require('koa-safe-jsonp'); // https://www.npmjs.com/package/koa-safe-jsonp

// custom
var autoload = require('./autoload');
var config = require('./config');
var serve = require('./serve');
var router = require('./routing');

function Application(options) {
  if (!(this instanceof Application)) {
    return new Application(options);
  }
  koa.call(this);
}

util.inherits(Application, koa);

var app = Application.prototype;

app.init = function() {
  this.configs = config();
  this.apps = autoload(this.configs.global.APPPATHNAME);

  this.staticpath = this.configs.global.STATICPATHNAME;
  this.viewspath = this.configs.global.VIEWSPATHNAME;
}

app.listen = function() {
  // dev logger
  if (this.env == 'development') {
    // logger middleware
    this.use(logger());
  }

  // the parsed body will store in this.request.body
  // if nothing was parsed, body will be an empty object {}
  this.use(bodyParser());

  this.use(json());
  jsonp(this);

  // 输出静态文件目录和静态模板目录
  serve(this);

  // 引入各项目逻辑，如../apps/app1/routes/*
  // this.configs.logge是关于日志打印的配置信息
  this.use(router(this.apps, this.configs.logger));

  var server = http.createServer(this.callback());
  return server.listen.apply(server, arguments);
};

module.exports = Application;
