'use strict';

module.exports = function(router, logger) {
  router.get('/loaderscss', function*(next) {
    yield this.render('demo');
  });
};
