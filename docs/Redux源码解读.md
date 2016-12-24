# Redux 源码解读
## 

## combineReducer


```

reducer以对象的形式传入，finalReducers 存放最终的reducer，finalReducerKeys存放reducer的key
最终返回  combination函数 reducer类型的函数，接受state和action 返回state

state的形式是一个大对象下面每一个reducer对应一个子state。

触发一个action，会遍历所有的reducer，
将该reducer的旧state和action传入，然后根据返回的新的state对象是否改变，来决定
最终的返回的state是否改变。
这里需要注意：由于state都是引用类型，这里比较是值比较
hasChanged = hasChanged || nextStateForKey !== previousStateForKey

所以如果我们想要改变全局的state，需要在reducer中返回新的对象，而不是原来的state对象，
如果返回原来的对象，即使对象里的值改变了，也不会引起全局state的改变。
 */
export default function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers)
  var finalReducers = {}
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i]

    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        warning(`No reducer provided for key "${key}"`)
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key]
    }
  }
  var finalReducerKeys = Object.keys(finalReducers)

  return function combination(state = {}, action) {
    /**
     校验语法错误，reducer返回的state不能是undefined
    */
    if (sanityError) {
      throw sanityError
    }

    var hasChanged = false
    var nextState = {}
    for (var i = 0; i < finalReducerKeys.length; i++) {
      var key = finalReducerKeys[i]
      var reducer = finalReducers[key]
      var previousStateForKey = state[key]
      var nextStateForKey = reducer(previousStateForKey, action)
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(key, action)
        throw new Error(errorMessage)
      }
      nextState[key] = nextStateForKey
      /**
        所以如果我们想要改变全局的state，需要在reducer中返回新的对象，而不是原来的state对象，
        如果返回原来的对象，即使对象里的值改变了，也不会引起全局state的改变。
      */
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey
    }
    return hasChanged ? nextState : state
  }
}

```


## bindActionCreator


```
function bindActionCreator(actionCreator, dispatch) {
  return (...args) => dispatch(actionCreator(...args))
}


  将actionCreators绑定上dispatch，key还是actionCreators的key，但是多做了一层dispatch
 */
export default function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch)
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error(
      `bindActionCreators expected an object or a function, instead received ${actionCreators === null ? 'null' : typeof actionCreators}. ` +
      `Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?`
    )
  }

  var keys = Object.keys(actionCreators)
  var boundActionCreators = {}
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i]
    var actionCreator = actionCreators[key]
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
    }
  }
  return boundActionCreators
}

```
## 中间件 applyMiddleware

```
 /**
  显示执行中间件，得到中间件的返回函数数组chain，然后利用compose方法，生成嵌套的执行chain
  方法的包装dispatch函数，
  中间件的形式是
  (getState, dispatch)=> next => action => {
     next(action);
  }
 */
export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer, preloadedState, enhancer) => {
    var store = createStore(reducer, preloadedState, enhancer)
    var dispatch = store.dispatch
    var chain = []

    var middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    }
    chain = middlewares.map(middleware => middleware(middlewareAPI))
    dispatch = compose(...chain)(store.dispatch)
    /**
    store.dispatch 就是第一个next  是last ware的next
    (...args) => {
      return ware0(ware1(ware2(last(...args))))
    }
    dispatch = ware0(ware1(ware2(last(...args))))
    所以中间件中next传入后返回的函数就是我们需要的函数形式，
    例如dispatch 需要的函数形式是 传一个action
    */
    return {
      ...store,
      dispatch
    }
  }
}

/**
reduceRight是数组的从右至左执行，
初始的参数是最后一个函数接受dispatch，
的到的一个action=>{
	dispatch(action);
}
形式的函数，作为参数composed
f的形式是
next=>action=>{
}
最终形成的就是
(...args) => {
	return funcs0(funcs1(funcs2(last(...args))))
}
*/
export default function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  const last = funcs[funcs.length - 1]
  const rest = funcs.slice(0, -1)
  return (...args) => rest.reduceRight((composed, f) => f(composed), last(...args))
}

```

## 中间件执行

```
/**
			中间件原理
		*/
		function func1 (next) {
			console.log('func1 return');
			return function (action) {
				console.log('func1start');
				next(action);
				console.log('func1end');
			}
			
		}
		function func2 (next) {
			console.log('func2 return');
			return function (action) {
				console.log('func2start');
				next(action);
				console.log('func2end');
			}
		}
		function func3 (next) {
			console.log('func3 return');
			return function (action) {
				console.log('func3start');
				next(action);
				console.log('func3end');
			}
		}

		function dispatch(action) {
			console.log(action);
		}

		function afterCompose (args) {
			return func1(func2(func3(args)));
		}

		var newdispatch = afterCompose(dispatch);
		newdispatch('action');
		/**
			执行顺序
			func3 return
			func2 return
			func1 return
			func1start
			func2start
			func3start
			action
			func3end
			func2end
			func1end
		*/
```

## createStore

```
import isPlainObject from 'lodash/isPlainObject'
import $$observable from 'symbol-observable'

export var ActionTypes = {
  INIT: '@@redux/INIT'
}

export default function createStore(reducer, preloadedState, enhancer) {


  var currentReducer = reducer
  var currentState = preloadedState
  var currentListeners = []
  var nextListeners = currentListeners
  var isDispatching = false

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice()
    }
  }

  function getState() {
    return currentState
  }

   /**
    订阅监听
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.')
    }

    var isSubscribed = true

    ensureCanMutateNextListeners()
    nextListeners.push(listener)

    return function unsubscribe() {
      if (!isSubscribed) {
        return
      }

      isSubscribed = false

      ensureCanMutateNextListeners()
      var index = nextListeners.indexOf(listener)
      nextListeners.splice(index, 1)
    }
  }


   /**
    执行reducer，获取state，执行listener
   */
  function dispatch(action) {
    

    try {
      isDispatching = true
      currentState = currentReducer(currentState, action)
    } finally {
      isDispatching = false
    }

    var listeners = currentListeners = nextListeners
    for (var i = 0; i < listeners.length; i++) {
      listeners[i]()
    }

    return action
  }


   /**
    替换reducer
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.')
    }

    currentReducer = nextReducer
    dispatch({ type: ActionTypes.INIT })
  }


  /**
    store创建的时候，获取初始的sate树
  */
  dispatch({ type: ActionTypes.INIT })

  return {
    dispatch,
    subscribe,
    getState,
    replaceReducer
  }
}

```
## flux-standard-action
- 普通javascript对象
- type，必须，string或者Symbol
- payload，可选，执行action所需要的数据，任何类型
- error,可选，标识这个action是否有错误，true or false
- meta，可选，任何类型，payload之外的其他数据。

## redux-actions

#### function createAction

```
'use strict';

exports.default = createAction;

/**
  返回创建action的函数
*/
function createAction(type, payloadCreator, metaCreator) {
  var finalPayloadCreator = typeof payloadCreator === 'function' ? payloadCreator : _identity2.default;
  /**
    返回的函数
  */
  var actionHandler = function actionHandler() {
    var hasError = (arguments.length <= 0 ? undefined : arguments[0]) instanceof Error;
  /**
    返回的action
  */
    var action = {
      type: type
    };
    //根据传入的参数，执行payloadCreator获取payload
    var payload = hasError ? arguments.length <= 0 ? undefined : arguments[0] : finalPayloadCreator.apply(undefined, arguments);
    if (!(payload === null || payload === undefined)) {
      action.payload = payload;
    }

    if (hasError) {
      // Handle FSA errors where the payload is an Error object. Set error.
      action.error = true;
    }
  //根据传入的参数，执行metaCreator获取payload
    if (typeof metaCreator === 'function') {
      action.meta = metaCreator.apply(undefined, arguments);
    }
    //可以看到  payloadCreator和metaCreator的参数都是用的传给actionHandler的参数

    return action;
  };

  actionHandler.toString = function () {
    return type.toString();
  };

  return actionHandler;
}
```
## react-redux
### Provider


```
import { Component, PropTypes, Children } from 'react'
import storeShape from '../utils/storeShape'
import warning from '../utils/warning'


export default class Provider extends Component {
  //把 store 放在context里面，给子元素用
  getChildContext() {
    return { store: this.store }
  }

  constructor(props, context) {
    super(props, context)
    this.store = props.store
  }

  render() {
    const { children } = this.props
    //渲染唯一的子元素
    return Children.only(children)
  }
}

Provider.propTypes = {
  store: storeShape.isRequired,
  children: PropTypes.element.isRequired
}
Provider.childContextTypes = {
  store: storeShape.isRequired
}

```
### connect

```


const defaultMapStateToProps = state => ({}) // eslint-disable-line no-unused-vars
const defaultMapDispatchToProps = dispatch => ({ dispatch })
const defaultMergeProps = (stateProps, dispatchProps, parentProps) => ({
  ...parentProps,
  ...stateProps,
  ...dispatchProps
})


export default function connect(mapStateToProps, mapDispatchToProps, mergeProps, options = {}) {


  //返回包装组件的函数
  return function wrapWithConnect(WrappedComponent) {

    class Connect extends Component {
      shouldComponentUpdate() {
        return !pure || this.haveOwnPropsChanged || this.hasStoreStateChanged
      }

      constructor(props, context) {
        super(props, context)
        this.version = version
        this.store = props.store || context.store

        invariant(this.store,
          `Could not find "store" in either the context or ` +
          `props of "${connectDisplayName}". ` +
          `Either wrap the root component in a <Provider>, ` +
          `or explicitly pass "store" as a prop to "${connectDisplayName}".`
        )

        const storeState = this.store.getState()
        this.state = { storeState }
        this.clearCache()
      }

      updateStatePropsIfNeeded() {
        const nextStateProps = this.computeStateProps(this.store, this.props)
        if (this.stateProps && shallowEqual(nextStateProps, this.stateProps)) {
          return false
        }

        this.stateProps = nextStateProps
        return true
      }

      updateDispatchPropsIfNeeded() {
        const nextDispatchProps = this.computeDispatchProps(this.store, this.props)
        if (this.dispatchProps && shallowEqual(nextDispatchProps, this.dispatchProps)) {
          return false
        }

        this.dispatchProps = nextDispatchProps
        return true
      }

      updateMergedPropsIfNeeded() {
        const nextMergedProps = computeMergedProps(this.stateProps, this.dispatchProps, this.props)
        if (this.mergedProps && checkMergedEquals && shallowEqual(nextMergedProps, this.mergedProps)) {
          return false
        }

        this.mergedProps = nextMergedProps
        return true
      }

      isSubscribed() {
        return typeof this.unsubscribe === 'function'
      }

      trySubscribe() {
        if (shouldSubscribe && !this.unsubscribe) {
          //订阅store的state变化
          this.unsubscribe = this.store.subscribe(this.handleChange.bind(this))
          this.handleChange()
        }
      }

      tryUnsubscribe() {
        if (this.unsubscribe) {
          this.unsubscribe()
          this.unsubscribe = null
        }
      }

      componentDidMount() {
        //订阅store的state变化
        this.trySubscribe()
      }

      componentWillReceiveProps(nextProps) {
        if (!pure || !shallowEqual(nextProps, this.props)) {
          this.haveOwnPropsChanged = true
        }
      }

      componentWillUnmount() {
        this.tryUnsubscribe()
        this.clearCache()
      }

      //订阅变化
      handleChange() {
        if (!this.unsubscribe) {
          return
        }

        const storeState = this.store.getState()
        const prevStoreState = this.state.storeState
        if (pure && prevStoreState === storeState) {
          return
        }

        if (pure && !this.doStatePropsDependOnOwnProps) {
          const haveStatePropsChanged = tryCatch(this.updateStatePropsIfNeeded, this)
          if (!haveStatePropsChanged) {
            return
          }
          if (haveStatePropsChanged === errorObject) {
            this.statePropsPrecalculationError = errorObject.value
          }
          this.haveStatePropsBeenPrecalculated = true
        }

        this.hasStoreStateChanged = true
        //如果有变化 setState，触发render
        this.setState({ storeState })
      }


      render() {
        const {
          haveOwnPropsChanged,
          hasStoreStateChanged,
          haveStatePropsBeenPrecalculated,
          statePropsPrecalculationError,
          renderedElement
        } = this

        

        //最终渲染组件，将合并属性传递给WrappedComponent
        if (withRef) {
          this.renderedElement = createElement(WrappedComponent, {
            ...this.mergedProps,
            ref: 'wrappedInstance'
          })
        } else {
          this.renderedElement = createElement(WrappedComponent,
            this.mergedProps
          )
        }

        return this.renderedElement
      }
    }

    Connect.displayName = connectDisplayName
    Connect.WrappedComponent = WrappedComponent
    Connect.contextTypes = {
      store: storeShape
    }
    Connect.propTypes = {
      store: storeShape
    }

    //把WrappedComponent的非静态react属性 复制到Connect，最终返回Connect
    return hoistStatics(Connect, WrappedComponent)
  }
}


```



