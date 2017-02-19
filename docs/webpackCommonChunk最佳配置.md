## webpackCommonChunk最佳配置
webpack.optimize.CommonsChunkPlugin插件用于抽取模块中的复用部分，以减少打包的代码量，我们还需要考虑到缓存的优化

首先是文件名包含文件的hash值，只有在文件有变动时hash值才会变
// webpack-dev-server在热替换的时候，不支持 chunkhash
var hashName = TARGET === "start" ? 'hash': 'chunkhash';
其次我们想要将引用的js资源进行几个文件的拆分，
- 第一个文件是最不经常变动的第三方的库文件，
- 第二个文件是业务的公用组件
- 第三个文件是每一个页面的js代码

我们的最佳配置如下：
```
entry: {
        vender:['./src2/Vue.js','./src2/vender.js'],  //指明vender的库
        common: ['./src2/component1.js','./src2/component2.js'],
        global:['./src2/global.js'], //需要全局进行配置的代码
        page1: ['./src2/page1.js'],
        page2: ['./src2/page2.js']
    },
plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['common','vender','boot'], 
            filename: '[name].[chunkhash].js',
            minChunks: 2
        })
]
```

minChunks是配置模块复用多少次以上进行抽取。

chunkhash 是这个chunk的hash，而hash是对所有打包的js整体生成的hash，所以为了对缓存的优化，我们采用chunkhash。

##### CommonsChunkPlugin中配置的name和entry中配置的入口之间有什么关系？
如果CommonsChunkPlugin 中配置的name在entry中存在，那么这个抽取的模块首先是包含enry中指定的js文件，然后再考虑包含抽取其他entry中的公用部分。

##### 为什么要在common中配置boot？
因为配置CommonsChunkPlugin插件以后，就需要在window上挂载window["webpackJsonp"]方法，这个方法中有所有chunk的chunkhash，所以只要有chunk变化，那么这个脚本就变化，所以应该把这个启动脚本单独抽成一个文件，否则就会影响其他不变的文件也改变hash值。

##### CommonsChunkPlugin中配置的name顺序有什么关系，每一个公用模块的抽取逻辑是什么？
这个没有找到官方的解释，通过实践，我认为应该是倒序考虑的，首先是启动脚本放在数组的最后一个文件中，例如boot中。
每一个模块的逻辑如下：

首先看自己有没有对应的entry，如果有则抽取entry对应的模块，并递归抽取模块中公用的模块。例如common中的component1.js和component2.js共同依赖jquery，则common中也抽取jquery。

其次看数组中是否还有上一个元素，如果没有则将所有entry中剩余没有抽取的公用模块也都抽取出来，如果有则交给上一个元素，自己也就执行完了。例如vender先将Vue.js和vender.js抽取出来，然后发现还有common模块，所以自己就执行完了，common先将component1.js和component2.js抽取出来以后，发现上面没有文件了，所以就把entry中剩余没有抽取的公共模块也抽取出来了，比如page1.js和page2.js公用的componet4.js。


这样打包以后我们需要保证页面中文件引用的顺序，因为他们之间有了依赖关系，例如上面的配置页面的引用顺序应该是
1 boot.js
2 vender.js
3 common.js
然后是每一个页面的js  page1.js 或者page2.js

##### 如何保证页面中js文件的引用顺序?
HtmlwebpackPlugin插件提供了 chunksSortMode方法，可以对页面中引用的chunk进行排序，我们先定义chunk的顺序数组，然后类似于数组的sort，用小的减去大的返回正序。
```
var chunksort = ['boot','vender','common','global'];
new HtmlwebpackPlugin({
    chunks: ['boot','vender','common','global',page.outputPath],
    title: page.title,
    // extra: extra, //包含页面额外的配置信息
    template: "src/index.html",
    filename: page.outputPath + '.html',
    chunksSortMode: function (a, b) {
        var aIndex =chunksort.indexOf(a.names[0]);
        var bIndex =chunksort.indexOf(b.names[0]);
        aIndex = aIndex < 0 ? chunksort.length + 1 : aIndex;
        bIndex = bIndex < 0 ? chunksort.length + 1 : bIndex;
        return aIndex - bIndex;
    }
})
```


