## js代码自动化的测试有什么好处？

1、开发者在写测试脚本的时候，能够更好的理解代码的的功能，返回值等等。

2、能够实现准确直接的测试，并立即看到测试结果，进行调整。

3、面对复杂的项目，对代码的修改有可能会牵一发动全身，代码的改动可能会影响到其他部分的功能，自动化测试能帮我们整体检查一遍。

4、测试的结果能够当做一个代码质量的依据。

在segmentfault上搜索“探知js测试”，可以得到三篇系列文章对js测试进行讲解，第一篇的地址：https://segmentfault.com/a/1190000004428902

需要用到的知识包括：BDD的测试模式、Mocha测试框架、chai断言库，更倾向使用expect/should、istanbul 测试覆盖率工具，
这里有篇简单介绍 http://www.ruanyifeng.com/blog/2015/06/istanbul.html，需要学一下makefile的使用，supertest 测试api接口的工具

测试的项目：https://github.com/yylgit/test-demo
![image description](http://dn-cnode.qbox.me/FlUCs5nuAvnbeUe2u-yHG5tm5X-L)
项目接入travis平台
建立.travis.yml文件，文件内容

```
language: node_js
node_js:
- "5"
- "4"
```

travis 执行的是package中的scripts的test命令
接入后在travis平台上可以看到每当仓库有变动时重新执行测试，https://travis-ci.org/yylgit/test-demo

travsi每次都是在新的环境中进行测试
接入 coveralls平台，https://coveralls.io/github/yylgit/test-demo
node项目利用 node-coveralls +istanbul
![image description](http://dn-cnode.qbox.me/Fg-TyGfwDO5LkN6gAeRimNolutUa)

最终在github上的README.md中显示图标
![image description](http://dn-cnode.qbox.me/FvkYY1ZDgDYHdoii4f1aspHPX817)

