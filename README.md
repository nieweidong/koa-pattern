# koa-pattern

### 开发中，预计本周完成

---

> 此文章分享自己在学习和使用koa的点滴，仅供参考，轻喷

> 主要介绍在较复杂的项目中，使用koa组建稳定、易维护、易扩展的服务端

### 环境要求

koa 依赖支持 generator 的 Node 环境，准确来说，是 ```node >= 0.11.9``` 的环境。

### 目录结构

### TODO
- 介绍Node项目中目录结构的一般套路

```
koa-pattern/
├── README.md
├── apps/
│   ├── app1
│   ├── app2
│   ├── app3
│   └── demo
├── configs/
│   ├── backend.js
│   ├── global.js
│   ├── logger.js
│   └── views.js
├── lib/
├── logs/
├── node_modules/
├── package.json
├── public/
├── script/
└── server.js
```

- gulp套路建议参考[learning-gulp](https://github.com/demohi/learning-gulp)，使用了Gulp+Webpack
- [.editorconfig套路](http://editorconfig.org/)，中文版请点击： [传送门](http://ju.outofmemory.cn/entry/104488)
- [在Node应用中避免“Dot Hell”](http://blog.leapoahead.com/2015/09/03/prevent-node-require-dot-hell/) 在Node项目中require模块，难免遇到类似```require('../../../../../module')```这种情况，这篇文章就是解决思路。
- 如使用git做仓库，请注意项目根目录的```.gitignore```文件。 其用法参考[廖雪峰-忽略特殊文件](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/0013758404317281e54b6f5375640abbb11e67be4cd49e0000)
- 完善各种脚本
  - 部署。把code部署至沙盒环境、生产环境，使用[shipit](https://www.npmjs.com/package/shipit)
  - 日志监控。如超过7天的日志删除或者移到其他地方
- 测试/调试
- 与数据库交互部分不介绍鸟
