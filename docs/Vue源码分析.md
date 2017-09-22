###计算属性的实现
`instance/state.js`中`initComputed`初始化计算属性。先是给每一个计算属性创建一个watcher存在`vm._computedWatchers`中，这个计算属性的watcher中记录了他所依赖的dep。当dep的属性变化，会更新计算属性。然后再利用`defineComputed`定义每一个计算属性的getter时`createComputedGetter`，调用`watcher.depend()`，这样就将依赖计算属性的外层watcher也与这个计算属性所依赖的内层dep建立联系，当依赖的data变化时，会触发计算属性自身的watcher和依赖计算属性的watcher。

```
function initComputed (vm: Component, computed: Object) {
  process.env.NODE_ENV !== 'production' && checkOptionType(vm, 'computed')
  const watchers = vm._computedWatchers = Object.create(null)

  for (const key in computed) {
    const userDef = computed[key]
    let getter = typeof userDef === 'function' ? userDef : userDef.get
    if (process.env.NODE_ENV !== 'production') {
      if (getter === undefined) {
        warn(
          `No getter function has been defined for computed property "${key}".`,
          vm
        )
        getter = noop
      }
    }
    //给每一个计算属性生成一个内部的watcher，一个是依赖的data变化时可以更新计算属性的值，
    //第二是可以收集计算属性所有依赖的data的dep对象，在计算属性的getter函数里，将计算属性
    //的外层watcher也都订阅在内层的data的dep中。
    // create internal watcher for the computed property.
    watchers[key] = new Watcher(vm, getter, noop, computedWatcherOptions)

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef)
    } else if (process.env.NODE_ENV !== 'production') {
      if (key in vm.$data) {
        warn(`The computed property "${key}" is already defined in data.`, vm)
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(`The computed property "${key}" is already defined as a prop.`, vm)
      }
    }
  }
}	
```
```
function createComputedGetter (key) {
  return function computedGetter () {
    const watcher = this._computedWatchers && this._computedWatchers[key]
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate()
      }
      //计算属性的getter这里是关键，依赖计算属性会创建一个外层的watcher，依赖着计算属性
      //但是在获取计算属性的时候，计算属性不像data那样，它本身没有Dep，它就把计算属性的watch
      //所有依赖的dep，都加上这个watch，也就是当这个计算属性依赖的state变化时，也触发外层的watch
      if (Dep.target) {
        watcher.depend()
      }
      return watcher.value
    }
  }
}
```

###props的实现
`instance/state.js`中`initProps`初始化属性。VM的props进行了getter和setter的定义，有自己的Dep，类似data,然后代理到VM上。

```
function initProps (vm: Component, propsOptions: Object) {
  const propsData = vm.$options.propsData || {}
  const props = vm._props = {}
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  const keys = vm.$options._propKeys = []
  const isRoot = !vm.$parent
  // root instance props should be converted
  observerState.shouldConvert = isRoot
  for (const key in propsOptions) {
    keys.push(key)
    const value = validateProp(key, propsOptions, propsData, vm)
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      if (isReservedAttribute(key) || config.isReservedAttr(key)) {
        warn(
          `"${key}" is a reserved attribute and cannot be used as component prop.`,
          vm
        )
      }
      defineReactive(props, key, value, () => {
        if (vm.$parent && !observerState.isSettingProps) {
          warn(
            `Avoid mutating a prop directly since the value will be ` +
            `overwritten whenever the parent component re-renders. ` +
            `Instead, use a data or computed property based on the prop's ` +
            `value. Prop being mutated: "${key}"`,
            vm
          )
        }
      })
    } else {
      defineReactive(props, key, value)
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, `_props`, key)
    }
  }
  observerState.shouldConvert = true
}
```

props的疑惑在于父组件传给子组件props的问题，父组件首次传props给子组件时，子组件初始化props属性，但是当父组件的data变化，导致props变化时，会做什么操作，会调用子组件的什么方法。

猜测一下，因为子组件的props已经定义成响应的属性了，所以当父组件的data变化时，可以只是改变子组件的props来触发子组件视图的更新。

那么如果传递的props不是值类型，是一个引用类型的变量？这个props属性的getter和setter还是父组件的，当子组件改变这个props的属性时，会触发父组件的rerender和子组件的rerender

###初始化methods
可以看到赋值给VM的method是bind了this的，this为vm，所以当把vm的method传递给子组件时，方法的this还是指向父组件。
```
function initMethods (vm: Component, methods: Object) {
  process.env.NODE_ENV !== 'production' && checkOptionType(vm, 'methods')
  const props = vm.$options.props
  for (const key in methods) {
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm)
    if (process.env.NODE_ENV !== 'production') {
      if (methods[key] == null) {
        warn(
          `method "${key}" has an undefined value in the component definition. ` +
          `Did you reference the function correctly?`,
          vm
        )
      }
      if (props && hasOwn(props, key)) {
        warn(
          `method "${key}" has already been defined as a prop.`,
          vm
        )
      }
    }
  }
}
```

### 初始化watch

调用了vm.$watch方法，其实也就是创建一个Watcher对象。

```
function initWatch (vm: Component, watch: Object) {
  process.env.NODE_ENV !== 'production' && checkOptionType(vm, 'watch')
  for (const key in watch) {
    const handler = watch[key]
    if (Array.isArray(handler)) {
      for (let i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i])
      }
    } else {
      createWatcher(vm, key, handler)
    }
  }
}

function createWatcher (
  vm: Component,
  keyOrFn: string | Function,
  handler: any,
  options?: Object
) {
  if (isPlainObject(handler)) {
    options = handler
    handler = handler.handler
  }
  if (typeof handler === 'string') {
    handler = vm[handler]
  }
  return vm.$watch(keyOrFn, handler, options)
}
```

###生命周期过程
new Vue之前

- initMixin 添加 Vue.prototype._init
- stateMixin 添加 $set、$delete、$watch 、$data、$props
- eventsMixin 添加 $on、$once、$off、$emit
- lifecycleMixin 添加 _update、$forceUpdate 、$destroy
- renderMixin 添加 $nextTick、_render


`platforms/web/runtime/index.js` 中的`Vue.prototype.$mount`不知道什么时候调用
`platforms/web/entry-runtime-with-compiler.js`

new Vue

- this._init
- initLifecycle
- initEvents
- initRender
- callHook(vm, 'beforeCreate')
- initInjections(vm)
- initState(vm)
	- initProps
	- initMethods
	- initData
	- initComputed
	- initWatch
- initProvide(vm) 
- callHook(vm, 'created')
- vm.$mount(vm.$options.el)  
`platforms/web/entry-runtime-with-compiler.js  Vue.prototype.$mount` => `compileToFunctions`函数生成render函数挂在vm.$options.render上 => `platforms/web/runtime/index.js Vue.prototype.$mount` => `core/instance/lifecycle.js  mountComponent` =>`vm._watcher = new Watcher(vm, updateComponent, noop)` => 利用watcher触发render和update，在data变化的时候也会触发updateComponent `vm._update(vm._render(), hydrating)`
- callHook(vm, 'beforeMount')
- callHook(vm, 'mounted')


vue的生命周期函数仅仅是钩子函数，react的生命周期函数，是真正的参与组件渲染的阶段。




###react setState
React.js => ReactComponent.js =>

```
ReactComponent.prototype.setState = function (partialState, callback) {
  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : _prodInvariant('85') : void 0;
  this.updater.enqueueSetState(this, partialState);
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'setState');
  }
};



```
` this.updater = updater || ReactNoopUpdateQueue;`

实际到了`react-dom`中的 `ReactUpdateQueue.js` enqueueSetState

=>





