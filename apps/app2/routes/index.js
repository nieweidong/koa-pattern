'use strict';

module.exports = function(router, logger) {
  router.get('/', function*(next) {
    try {
      logger.info({
        url: this.request.url,
        href: this.request.href,
        header: this.request.header,
        ip: this.request.ip,
        ips: this.request.ips
      });
      this.state = {url: this.request.url}
      yield this.render('index');
    } catch (err) {
      logger.error({
        err_msg: err,
        url: this.request.url,
        href: this.request.href,
        header: this.request.header,
        ip: this.request.ip,
        ips: this.request.ips
      });
    }
  });
};
