/*
 * koa-pattern
 * @nieweidong
 */
'use strict';

var application = require('./lib/application');
var serve = require('koa-static');

var app = application();

// 必须先执行。初始化项目目录和项目配置
app.init();

// Static Middleware
// 全局的公共目录
app.use(serve('public'));

var _port = app.configs.global.port;
app.listen(_port, function() {
  console.log('listen on', _port);
});

// TODO
// ./configs/views.js 这个文件得写几个对应的demo
// ./public 这个文件得写对应的demo
