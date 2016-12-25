## 1 全局上下文中的this
在浏览器引擎的全局运行上下文中（在任何函数体外部），this 指代全局对象，无论是否在严格模式下。

```
<script>
    'use strict';
    console.log(this === window); // true
</script>
<script>
    console.log(this === window); // true
</script>
```

在node的全局上下文，发现this是一个空对象，无论是否在严格模式下。



在函数内部，this的值取决于函数是如何调用的。

2 直接调用函数中的this
在非严格的模式下，this的值默认为全局对象，window或者global。
在严格模式下，this的值为undefined。

一般我们利用this的场景，都不是指代全局对象，所以出现这种this是全局对象或者undefined的时候 往往是我们出错了


```
<script>
    'use strict';
    function f1 () {
        console.log(this === window);
    }
    f1();// false
</script>
<script>
    function f1 () {
        console.log(this === window);
    }
    f1();// true
</script>
```

3 调用对象方法中的this
当以对象的方法调用函数时，函数中的this指向调用该函数的方法


```
var o = {
  prop: 37,
  f: function() {
    return this.prop;
  }
};
console.log(o.f()); // logs 37
/**********************************/
  
var o = {prop: 37};
 
function independent() {
  return this.prop;
}
 
o.f = independent;
 
console.log(o.f()); // logs 37  //只取决于最后的函数调用
```


函数的this指向调用它的最近对象，这里independent函数中的this指向的是o.b 而不是o。

```
o.b = {
  g: independent,
  prop: 42
};
console.log(o.b.g()); // logs 42
```

 
以下原型链和getter、setter中的this，都是调用对象方法中this的场景。

之前犯过一个反过来的错误，在一个对象中定义的方法中调用this，但是使用方法的时候没有通过对象调用，所以this为undefined而不是原来的对象。

###3.1 原型链中的 this
相同的概念在定义在原型链中的方法也是一致的。如果该方法存在于一个对象的原型链上，那么this指向的是调用这个方法的对象，表现得好像是这个方法就存在于这个对象上一样。


```
var o = {
  f : function(){
    return this.a + this.b;
  }
};
var p = Object.create(o);
p.a = 1;
p.b = 4;
 
console.log(p.f()); // 5
```

 
在这个例子中，对象p没有属于它自己的f属性，它的f属性继承自它的原型。但是这对于最终在o中找到f属性的查找过程来说没有关系；查找过程首先从p.f的引用开始，所以函数中的this指向p。也就是说，因为f是作为p的方法调用的，所以它的this指向了p。这是JavaScript的原型继承中的一个有趣的特性。 
### 3.2 getter 与 setter 中的 this
再次，相同的概念也适用时的函数作为一个 getter 或者 一个setter调用。作为getter或setter函数都会绑定 this 到从设置属性或得到属性的那个对象。

```
function modulus(){
  return Math.sqrt(this.re * this.re + this.im * this.im);
}
 
var o = {
  re: 1,
  im: -1,
  get phase(){
    return Math.atan2(this.im, this.re);
  }
};
 
Object.defineProperty(o, 'modulus', {
  get: modulus, enumerable:true, configurable:true});
 
console.log(o.phase, o.modulus); // logs -0.78 1.414
```

## 4 构造函数中的 this
当一个函数被作为一个构造函数来使用（使用new关键字），它的this与即将被创建的新对象绑定。

注意：当构造器返回的默认值是一个this引用的对象时，可以手动设置返回其他的对象，如果返回值不是一个对象，返回this。

```
function C(){
  this.a = 37;
}
 
var o = new C();
console.log(o.a); // logs 37
 
function C2(){
  this.a = 37;
  return {a:38};
}
 
o = new C2();
console.log(o.a); // logs 38
```

在最后的例子中（C2），因为在调用构造函数的过程中，手动的设置了返回对象，与this绑定的默认对象被取消（本质上这使得语句“this.a = 37;”成了“僵尸”代码，实际上并不是真正的“僵尸”，这条语句执行了但是对于外部没有任何影响，因此完全可以忽略它）。
## 5 call 和 apply
call和apply可以指定函数执行时this的指向。 

当一个函数的函数体中使用了this关键字时，通过所有函数都从Function对象的原型中继承的call()方法和apply()方法调用时，它的值可以绑定到一个指定的对象上。


```
function add(c, d){
  return this.a + this.b + c + d;
}
 
var o = {a:1, b:3};
 
// The first parameter is the object to use as 'this', subsequent parameters are passed as
// arguments in the function call
add.call(o, 5, 7); // 1 + 3 + 5 + 7 = 16
 
// The first parameter is the object to use as 'this', the second is an array whose
// members are used as the arguments in the function call
add.apply(o, [10, 20]); // 1 + 3 + 10 + 20 = 34
```

 使用 call 和 apply 函数的时候要注意，如果传递的 this 值不是一个对象，JavaScript 将会尝试使用内部 ToObject 操作将其转换为对象。因此，如果传递的值是一个原始值比如 7 或 'foo' ，那么就会使用相关构造函数将它转换为对象，所以原始值 7 通过new Number(7)被转换为对象，而字符串'foo'使用 new String('foo') 转化为对象，例如：


```
function bar() {
  console.log(Object.prototype.toString.call(this));
}
 
bar.call(7); // [object Number]
```
 
## 6 bind 方法
 
ECMAScript 5 引入了 Function.prototype.bind。调用f.bind(someObject)会创建一个与f具有相同函数体和作用域的函数，但是在这个新函数中，this将永久地被绑定到了bind的第一个参数，无论这个函数是如何被调用的。

可以看到，call和apply是不改变原来的函数，只是在执行的时候指定函数的this，而bind方法则是生成了一个this指向固定的函数，


```
function f(){
  return this.a;
}
 
var g = f.bind({a:"azerty"});
console.log(g()); // azerty
 
var o = {a:37, f:f, g:g};
console.log(o.f(), o.g()); // 37, azerty
```

在ES6的语法中，箭头函数默认绑定当前函数声明环境的this。
## 7 DOM事件处理函数中的 this
当函数被用作事件处理函数时，它的this指向函数所绑定的DOM对象。

event.currentTarget指向事件所绑定的元素，而event.target始终指向事件发生时的元素
所以this 始终和 event.currentTarget 相同。

```
<body>
    <div id="wrapper" style="height:200px; background: red">
        <input id="inner" type="button" value="inner" />
    </div>
</body>
<script>
    function func1 (e) {
        console.log('wrapper')
        console.log('this');
        console.log(this);
        console.log("e.target");
        console.log(e.target);
        console.log('e.currentTarget');
        console.log(e.currentTarget);
    }
    function func2 (e) {
        console.log('inner')
        console.log('this');
        console.log(this);
        console.log("e.target");
        console.log(e.target);
        console.log('e.currentTarget');
        console.log(e.currentTarget);
    }
    document.getElementById("wrapper").addEventListener('click',func1);
    document.getElementById("inner").addEventListener('click',func2);
</script>
```

## 8 内联事件处理函数中的 this
 当代码被内联处理函数调用时，它的this指向监听器所在的DOM元素：


```
<button onclick="alert(this.tagName.toLowerCase());">
  Show this
</button>
//上面的alert会显示button。注意只有外层代码中的this是这样设置。

<button onclick="alert((function(){return this})());">
  Show inner this
</button>
```

在这种情况下，没有设置内部函数的 this，所以它指向 global/window 对象（即非严格模式下调用的函数未设置 this 时指向的默认对象）。
 
本文绝大多数内容参考自： https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this
仅作少许修改
