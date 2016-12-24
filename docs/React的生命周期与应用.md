# 目录
- 1.react组件的两种创建写法
- 2.组件的生命周期在不同状态下的执行顺序
- 3.组件各生命周期的应用

## 1.react组件的两种创建写法

第一种ES5写法，React.createClass

```
React.createClass({
    getDefaultProps() {
        return {
            key1:value1
        }
    },
    getInitialState() {
        return {
            state1:state1
        }
    }
});
```
第二种是ES6写法，继承React.Component类

```
export default class Test1 extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            state1: state1
        }
    }
    static defaultProps = {
        data: 2,
    };
    static propTypes = {
        optionsData: React.PropTypes.array,
        onSelect: React.PropTypes.func,
        selectedOption: React.PropTypes.object,
        topStyle: React.PropTypes.any,
        placeholder: React.PropTypes.string
    }
 
}
```
getDefaultProps、getInitialState是在createClass时调用的方法，而在继承component类时，getDefaultProps方法对应给类添加静态属性  defaultProps ，getInitialState 对应在类的构造函数中设置  state属性

## 2.组件的生命周期在不同状态下的执行顺序

组件首次装载（first-Mount）： 

- getDefaultProps() → 
- getInitialState() →
- componentWillMount() →
- render()  →  
- componentDidMount()

卸载组件时（Unmount）：componentWillUnmount()

当重新装载组件时（Re-Mount）：
- getInitialState()→
- componentWillMount()→
- render() → 
- componentDidMount()，
- 但并不执行 getDefaultProps； defaultProps是放在组件类上的static属性

当再次渲染组件时（Re-Render），此时按顺序执行

- componentWillReceiveProps(nextProps )(组件接收到新的props才会调用，只是改变state时不调用)→ 
- shouldComponentUpdate(组件接收到新的props才会调用，只是改变state时不调用)→ 
- componentWillUpdate→
- render →  
- componentDidUpdate。
 
单独调用setState的重新渲染
- componentWillUpdate→
- render →  
- componentDidUpdate


1、在单页应用中，用react-router的history做页面跳转时，是将当前route的所有组件卸载，再跳转回来时是重新装载组件，而不是首次装载。

2、在使用react-native的Navigator时，每次push新页面的时候是首次加载，旧页面没有卸载，在pop新页面的时候，新页面会卸载 调用Unmount，旧页面是重新渲染
- componentWillReceiveProps→ 
- componentWillUpdate→
- render →  
- componentDidUpdate。
，不是重新装载，也没有重新渲染的shouldComponentUpdate控制，所以pop回来肯定重新渲染。

3、组件在内存中装载过一次之后，组件的defaultProps就初始化了，之后装载就不会重新设置。

4、父组件的render都会引起子组件的重新渲染。

5、 不能在componentWillUpdate ，render和componentDidUpdate 中调用setState

## 3.组件各生命周期的应用
3.1   getDefaultProps方法 或者 defaultProps 对象
- 只在组件类创建的时候调用一次，之后会被缓存起来。
- defaultProps在组件实例之前创建，实例间共享。
- 会和父组件设置的props进行合并。

3.2 getInitialState方法或constructor的state属性

项目中会把组件用到的state初始化在这里

```
constructor (props) {
    super(props);
    this.state = {
        poi: null,
        activeTabId: null,
        cartCount: Shopcart.size(),
        domSize:{
            headerHeight: 100,
            bannerHeight: 200,
            categoryTabHeight: 100,
        },
        hiddenBanner: false //是否隐藏banner
    };

}
```
3.3 componentWillMount()

组件初次render之前调用，如果在此方法中调用setState，render将感知到更新后的state，并且只执行这一次render，可以在此方法中fetch数据，不需要dom操作的数据获取。

3.4 render()

组件渲染的方法，是组件唯一的必须实现的方法，在该方法中，我们可以通过props和state渲染不同的组件。返回null或者false代表不渲染任何东西。

```
render () {
    return (
        <header className="header-wrapper">
            <div className="header header-normal">
                {this.renderLeftComponent()}
                <span>{this.props.title || '美团商超'}</span>
                {this.renderRightComponent()}
            </div>
        </header>
    );
}
```
3.5 componentDidMount()

组件装载后调用的方法，因为该方法调用的时候，组件已经装载，并且该方法不在render的循环当中，一般在该方法中做一些fetch数据或者改变state的方法。
还可以通过ReactDOM.findDOMNode(_this.refs.wrapper) 来获取DOM节点 进行操作。


```
componentDidMount() {
    this.mounted = true;
    if(this.props.poi){
        this.fetchCategoryTabs(this.props.poi.poiId);
    }
    if(!this.isCalculate) {
        this.calculateWidth(); 
    }
}
```

3.6 componentWillReceiveProps(nextProps)

在组件接收到新的 props 的时候调用。在初始化渲染的时候，该方法不会调用。可以在该方法中判断，当props变化时，是否再去重新fetch数据，setState。
   

```
componentWillReceiveProps (nextProps) {
    if(nextProps.poi &&(nextProps.poi != this.props.poi)) {
        this.fetchBannerList(nextProps.poi.poiId);
    }
}
```

3.7 shouldComponentUpdate(nextProps, nextState)

在接收到新的props或者state变化时，被调用，该方法在初始化渲染和forceUpdate的时候不会被调用。
     默认返回true，如果返回false，则render不会执行。可以在这个方法中来阻止不必要的render，因为有时是因为父组件的render引起的子组件不必要的render。


```
shouldComponentUpdate(nextProps, nextState) {
    const isStateChanged = Object.keys(nextState).some(key=> {
        return nextState[key] !== this.state[key]
    });
    const isPropsChanged = Object.keys(nextProps).some(key=> {
        return nextProps[key] !== this.props[key]
    });
    return isStateChanged || isPropsChanged
}
```

3.8 componentWillUpdate(nextProps, nextState) 

在接收到新的 props 或者 state 之前立刻调用。在初始化渲染的时候该方法不会被调用。使用该方法做一些更新之前的准备工作。你不能在刚方法中使用 this.setState()。如果需要更新 state 来响应某个 prop 的改变，请使用 componentWillReceiveProps。   项目中应用不多。

3.9 componentDidUpdate

在组件的更新已经同步到 DOM 中之后立刻被调用。该方法不会在初始化渲染的时候调用。使用该方法可以在组件更新之后操作 DOM 元素。


有些操作可能需要操作DOM元素，并且在第一次componentDidMount时还没有达到条件，所以需要在componentDidUpdate时再做操作，但是componentDidUpdate在render的循环函数中，
所以需要设置变量做控制。

下面例子中 this.isCalculate 就是判断是否计算过的变量。 
 
```
componentDidMount() {
    this.mounted = true;
    if(this.props.poi){
        this.fetchCategoryTabs(this.props.poi.poiId);
    }
    if(!this.isCalculate) {
        this.calculateWidth(); 
    }
}
componentDidUpdate () {
    if(!this.isCalculate) {
        this.calculateWidth(); 
    }
}
calculateWidth () {
    if(this.isCalculate) {
        return;
    }
    let tablist = this.state.categoryTabs;
    if(tablist.length == 0) {
        return;
    }
    let tabsDOM = this.refs.tablist,
        childrensDOM = tabsDOM.childNodes,
        container = this.refs.tabcontainer,
        wrapper = this.refs.wrapper,
    // 横向滚动宽度
        scrollwidth = 5;
    for(let i=0; i<childrensDOM.length; i++){
        let childDOM = childrensDOM[i];
        scrollwidth += childDOM.clientWidth + parseInt(childDOM.style.marginRight);
    }
    scrollwidth = Math.max(tabsDOM.clientWidth,scrollwidth);
    this.setState({tabsWidth: scrollwidth + 'px'});
     
    this.props.setCategoryTabHeight(wrapper.offsetHeight);
    this.isCalculate = true;
}
```

3.10 componentWillUnmount

在组件从 DOM 中移除的时候立刻被调用。在该方法中执行任何必要的清理，比如无效的定时器，或者清除在 componentDidMount 中创建的 DOM 元素。
可以记录组件的mount状态，在 componentDidMount 中设置this.mounted = true 。 在componentWillUnmount 中设置 this.mounted = false。
