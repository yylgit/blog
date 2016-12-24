## JS 中的类型判断
### js中的数据类型
基本数据类型

undefined、number、string、boolean

引用数据类型

null、Object、Number、String、Boolean、Function、Array、Date、RegExp、Error、Arguments

### typeof
typeof操作符可能返回下面几种字符串
- "undefined" 如果这个值未定义
- "boolean" 如果这个值是布尔值
- "string" 如果这个值是字符串
- "number" 如果这个值是数值,注意其中NaN 返回的也是"number"
- "function" 如果这个值是函数
- "object" 如果这个值是对象或者是null

undefined boolean string number  都是基本的数据类型
function 和 object是引用类型，变量指向的是对象的地址，
对于引用类型的变量，typeof只可以区分出function，其他类型的统一识别成object。

boolean string 和number这三种基本的数据类型，都有对应的引用包装类型
Boolean String 和Number。

对于这些包装类型的变量，typeof统一识别成object

```
var a = new String('hello');
typeof a // object
var b = 'hello';
a === b // false
a ==b //true
a 实际变成了一个String类型的引用变量
所以a === b 是false，但是用== 比较的时候 b隐式调用了toString的方法 所以是true
```
![image description](http://dn-cnode.qbox.me/FuQ_013hoaUk1s5EhjiZ3p2xH1Vv)
多说一句，其实我们在调用基本类型的方法的时候，都是隐式的转为包装对象以后才能调用。
### instanceof
instanceof 应用于引用类型的判断，所以对于string number boolean 这三类基本类型没有什么意义。
instanceof 支持继承 因为所有的引用类型都继承自Object，所以所有引用变量都是Object的实例

```
var a = new String('hello');
a instanceof String  //true
a instanceof Object  //true
var b = 'hello';
b instanceof String  // false

```
我开始以为instanceof是通过判断a的`__proto__` 上的`constructor` 属性来判断构造函数的类型，但是改变`a.__proto__.constructor = Number` 之后
`a instanceof String ` 仍然为true
```
var a = new String('hello');
a.__proto__.constructor = Number;
a instanceof String  //true
a instanceof Number  //false
```

### Object.prototype.toString.call()
这个是通过调用Object原型上的toString方法来判断变量的类型
这个方法不会区分是基本类型还是包装的引用类型，其实大多数情况下我们真不不需要区分。

```
var a = new String('hello')
var b = 'hello';
Object.prototype.toString.call(a)  //"[object String]"
Object.prototype.toString.call(b)  //"[object String]"
```
该方法还能够区分null和undefined
```
Object.prototype.toString.call(null)  //"[object Null]"
Object.prototype.toString.call(undefined)  //"[object Undefined]"
```
所以判断数据类型最靠谱的方法就是这个了。

### underscore 中的实现

```
//代码中的toString 方法 就是Object.prototype.toString
// Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
  _.each(['Arguments','Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });
  
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };
  
虽然这个方法很好但是没有办法区分基本类型和引用类型，采用typeof可以判断：
    // 判断是否是引用类型
    _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
    };

    //通过instanceof Object  应该也可以判断 是不是引用类型 并且不是null和undefined
  
  
    // 判断是否为数组
    _.isArray = nativeIsArray || function(obj) {
      return toString.call(obj) === '[object Array]';
    };
    //nativeIsArray 是ES5原生的Array.isArray
    
    //判断是否是NaN，利用NaN是唯一一个不等于自己的Number类型
    _.isNaN = function(obj) {
      return _.isNumber(obj) && obj !== +obj;
    };
    
    _.isUndefined = function(obj) {
        return obj === void 0;
    };
  
    _.isNull = function(obj) {
        return obj === null;
    };
    
     _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
    };
    
    //在 IE < 9 下对 arguments 调用 Object.prototype.toString.call，结果是 [object Object]，所以利用他的callee属性来判断
    if (!_.isArguments(arguments)) {
        _.isArguments = function(obj) {
          return _.has(obj, 'callee');
        };
    }
```
