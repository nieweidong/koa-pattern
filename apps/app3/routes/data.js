'use strict';

module.exports = function(router, logger) {
  router.get('/data', function*(next) {
    this.jsonp = {
      name: 'koa-pattern',
      author: 'nieweidong',
      git: 'https://github.com/nieweidong',
      repositories: 'https://github.com/nieweidong/koa-pattern',
    }
  });
};
