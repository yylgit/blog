## JS 当中的对象遍历


### for in
 for in  用于遍历对象中可枚举的属性值，包括继承来的属性，如果想要
 遍历非继承的可枚举属性，需要配合对象的hasOwnProperty方法。
语法形式
```
for (variable in object) {...
}
```
mdn例子

```
var obj = {a:1, b:2, c:3};
    
for (var prop in obj) {
  console.log("obj." + prop + " = " + obj[prop]);
}

// Output:
// "obj.a = 1"
// "obj.b = 2"
// "obj.c = 3"


var triangle = {a:1, b:2, c:3};

function ColoredTriangle() {
  this.color = "red";
}

ColoredTriangle.prototype = triangle;

var obj = new ColoredTriangle();

for (var prop in obj) {
  if( obj.hasOwnProperty( prop ) ) {
    console.log("obj." + prop + " = " + obj[prop]);
  } 
}

// Output:
// "obj.color = red"

```

### Object.keys
在ES5中定义的方法
这个方法可以获取对象自己拥有的可枚举属性的数组。所以在遍历对象
的属性的时候，经常使用它。
使用方法

```
var obj = {a: 1, b: 2,c:3};
Object.keys.forEach(key=>{
    console.log('obj.'+key+ '='+ obj[key]);
})
```


### underscore

```
//nativeKeys 就是Object.keys
//collectNonEnumProps 是为了解决IE9以下，重新toString等属性时，不能遍历到的问题

// Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve all the property names of an object.
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };
  
    // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

```

