'use strict';

/**
 * @des 路由配置
 * staticpath 表示项目的静态目录，默认public
 * viewspath 表示项目的模板目录，默认views
 * default 表示文件后缀名，默认html;如./views/index.html
 * map 只有当default不为html时才有用；为html是使用koa-send，非html使用co-views
 * 	这里的hbs 表示后缀名对应的模板解析引擎
 */
module.exports = {
  demo: {
    staticpath: 'testpublic',
    viewspath: 'testviews',
  },
  app1: {
    default: 'hbs',
    map: {
      hbs: 'handlebars'
    }
  },
  app2: {},
  app3: {}
}
