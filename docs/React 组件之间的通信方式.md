在项目开发的过程中，随着应用功能复杂度的增加和组件层次划分的需求，组件之间的通信越来越多，
我大致认为组件之间的通信分为3种：父-子组件通信、子-父组件通信和同级组件之间的通信。

- 1.父-子组件通信
- 2.子-父组件通信
- 3.同级组件之间的通信

## 1.父-子组件通信

### 1.1通信的手段

这是最常见的通信方式，父组件只需要将子组件需要的props传给子组件，子组件直接通过this.props来使用。

### 1.2 通信内容
更多要提的是如何合理的设置子组件的props，要想将子组件设计成一个复用性强的通用组件，需要将能够复用的部分抽象出来，
抽象出来的props有两种形成，一种是简单的变量，另一种是抽象出来处理某种逻辑的函数。

以Header 组件为例
<img width="344" alt="2016-01-22 4 30 59" src="https://cloud.githubusercontent.com/assets/11867564/19828201/caa98e66-9df2-11e6-8f71-94c0f5addd65.png">

抽象出来三个props，分别是中间的title，渲染组件左边的renderLeftComponent，渲染组件右边的renderRightComponent
Header的 部分实现

```
renderLeftComponent () {
    let leftDOM = {};
 
    if(this.props.renderLeftComponent) {
        return this.props.renderLeftComponent();
    }
    if (this.props.showBack) {
        let backFunc = this.props.onBack || this.goBack;
        leftDOM = (<a onClick={backFunc.bind(this)}><i className="icon left-icon icon-left-arrow"></i></a>);
    }
    return leftDOM;
}
renderRightComponent () {
    if(this.props.renderRightComponent) {
    return this.props.renderRightComponent();
}
}
render () {
    return (
        <header className="header-wrapper">
            <div className="header header-normal">
            {this.renderLeftComponent()}
            <span>{this.props.title || '维C果蔬'}</span>
            {this.renderRightComponent()}
            </div>
        </header>
    );
}
```
### 1.3 通信的动机

1.1中Header组件 props的通信动机 是子组件需要这样的属性来完成自己的展示。还有一种动机可以统称向子组件传递监听事件,
前一种是子组件的需求，后一种更多的是父组件的需求，例如Listview的onEndReached这种属性，触发源是在子组件中，当子组件
的事件被触发或者达到某种状态的时候，调用父组件从属性中传过来的方法。

## 2.子-父组件通信

### 2.1 通信的手段
父-子组件通信的手段是通过子组件的props是子组件用父组件的东西，子-父组件通信，是父组件用子组件的东西，应该将传递的内容直接写在子组件上，然后给子组件设置ref，父组件直接通过ref操作子组件的属性。

### 2.2 通信的内容

子组件的属性

### 2.3 通信的动机
父组件想要调用子组件的属性

## 3.同级组件之间的通信
同级组件之间的通信，是构建复杂界面的粘合剂，哎呦喂，我好会比喻啊
以维C果蔬的首页为例：
![image description](http://mss.vip.sankuai.com/v1/mss_43af2378df554a1e8a6c9294ff1bc80a/zc/10cb17528ee24c80a859a6b2e5c3bfaa.jpg)

通信1： Listview需要offsetHeight属性，Listview

Height的计算公式：window.innerHeight-Banner的Height-Menu的Height，

而Banner和Menu的Height都是需要在其Mount的时候才能计算。

通信2： ListView需要Menu的MenuId，才能够根据MenuId获取sku数据。

### 3.1通信的方式
同级组件之间的通信还是需要通过父组件作为中介，利用多次父-子组件通信，项目中将需要传递的数据放在了父组件的state中，变动时可以自动的同步传递。
将 bannerHeight，menuHeight，MenuId放在state中。
父组件代码示意：

```
this.state {
    bannerHeight: 0,
    menuHeight: 0,
    MenuId: 0
}
setBannerHeight(height) {
    this.setState({bannerHeight:height});
}
setMenuHeight(height) {
    this.setState({menuHeight:height});
}
onMenuClick(menuId) {
    this.setState({menuId:menuId});
}
<Banner setBannerHeight={this.setBannerHeight.bind(this)} />
<Menu setMenuHeight={the.setMenuHeight.bind(this)} onMenuClick={this.onMenuClick.bind(this)} />
<SkuList offsetHeight={this.state.bannerHeight + this.state.menuHeight} menuId={this.state.menuId} />
```

### 3.2通信的动机

当组件需要的props，不能直接从父组件中获取时，需要父组件作为中介，再与其他的组件进行通信获取。

