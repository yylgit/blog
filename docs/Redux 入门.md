## 1.什么是Redux
管理Web应用全局状态的框架。

单页面应用，顾名思义，和传统项目的最明显区别就是项目只有一个页面，页面有一个根元素，我们写的每一个页面是一个大的组件，前端接管路由来渲染不同的页面组件。

随着应用的复杂，前端需要存储更多的state，包括缓存的全局数据，本地生成尚未持久化到服务器的数据，也包括 UI 状态，如激活的路由，被选中的标签，是否显示加载动效或者分页器等等。

如果是单纯的数据缓存 也没什么需要考虑的东西，放到内存就可以了， 重点是还要让state和view有绑定的关系。state的变化能够触发view的变化。

在我们的项目中，没有用redux之前，我们都是页面组件管理state，出现以下需求的时候，写起来就比较复杂

- 某个组件的状态，需要共享
- 某个状态需要在任何地方都可以拿到
- 一个组件需要改变全局状态
- 一个组件需要改变另一个组件的状态

## 2.Redux的原则和设计思想
### 2.1 三大原则
- 单一数据源：整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中
- State 是只读的：惟一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象。
- 使用纯函数来执行修改： 为了描述 action 如何改变 state tree ，你需要编写 reducers。只要是同样的输入，必定得到同样的输出。
纯函数是函数式编程的概念，必须遵守以下一些约束。
不得改写参数
不能调用系统 I/O 的API
不能调用Date.now()或者Math.random()等不纯的方法，因为每次会得到不一样的结果
### 2.2 设计思想：
（1）Web 应用是一个状态机，视图与状态是一一对应的。

（2）所有的状态，保存在一个对象里面。

## 3.Redux中的概念
### 3.1 Action 
执行的动作，包括动作所需要的数据，改变store数据的唯一来源，一般是通过store.dispatch() 将 action 传到 store。

Action 本质上是 JavaScript 普通对象。

flux-standard-action  FSA标准 
- type，必须，string或者Symbol
- payload，可选，执行action所需要的数据，任何类型
- error,可选，标识这个action是否有错误，true or false
- meta，可选，任何类型，payload之外的其他数据。


###3.2 Reducer
根据action 做更新state的操作。

Action 只是描述了有事情发生了这一事实，并没有指明应用如何更新 state。而这正是 reducer 要做的事情。
### 3.3 Store
Store就是保存全局state的容器，保存三个常用的api
- getState，获取当前的state
- subscribe，给store变化添加监听函数
- dispatch，用于接受action的方法，触发reducer和监听函数

### 3.4 单项数据流
用户通过View，dispatch 相应的action，store调用reducer获取最新的state，并触发通过subscribe订阅的监听函数，监听函数中我们通过store的getState方法获取最新的state，更新view。
工作流程图
![image description](http://dn-cnode.qbox.me/For2XJS4H2rqv4a7L4zFhkSEth6C))
## 4.应用实例
simpleredux/index.js

```
import {createStore} from 'redux';
 
export function createAction(type, payload) {
    return {
        type,
        payload
    }
}
const initialState = {
    time: new Date().getTime()
}
 
function reducer(state = initialState, action) {
    switch (action.type) {
        case 'NOW_TIME':
            return {
                ...state,
                time: action.payload
            }
        default:
            return state;
    }
}
 
let store;
export function getStore() {
    if(store) return store;
    return store = createStore(reducer);
}
```
TestRedux.js

```
'use strict';
 
import React, { Component } from 'react';
 
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import MtButton from '@scfe/react-native-button';
import {getStore, createAction} from '../../simpleredux/index';
const store = getStore();
class TestRedux extends Component {
    constructor(props) {
        super(props);
        let state = store.getState();
        this.state = {
            time: state.time
        };
        store.subscribe(()=>{
            let state = store.getState();
            this.setState({
                time: state.time
            });
        });
    }
 
    _sendAction() {
        let action = createAction('NOW_TIME', new Date().getTime());
        store.dispatch(action);
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>{this.state.time}
                </Text>
                <MtButton text="发出action" onPress={this._sendAction.bind(this)} />
            </View>
        );
    }
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40
    }
});
 
export default TestRedux;
```

