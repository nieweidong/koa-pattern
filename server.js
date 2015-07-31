/*
 * koa-pattern
 * @nieweidong
 */
var koa = require('koa');
var send = require('koa-send');
var serve = require('koa-static');
var router = require('koa-router')();

var app = koa();

// Static Middleware
app.use(serve('public'));

// logger
app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

router.get('/', function *(next) {
  this.body = 'hello world';
});

app.use(router.routes())

app.listen(8013);
