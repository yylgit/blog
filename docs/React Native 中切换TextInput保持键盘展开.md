## 1、问题
###  问题场景：
由于手机屏幕高度不定，做表单页面时，外层通常加上ScrollView组件，使其能够适应屏幕进行滚动。业务需要里面放置多个TextInput组件。

###  问题描述：
出现的问题是，首次点击focus TextInput，键盘弹出，然后想要点击连续focus TextInput时，结果没有focus，而是键盘收起，需要再次点击TextInput 进行focus。
                   结果就是每次切换输入框都需要点击两次。
### 问题影响： 

这个问题使得app的体验差到了极点，饱受用户吐槽。
## 2、解决方案
### 2.1 整体思路

保持键盘一直展开，然后点击的时候，能够判断点击的组件是否为TextInput，如果是则键盘不收起，否则键盘收起。
### 2.2 解决步骤
#### 1） 在ScrollView中如何保持键盘一直展开

阅读ScrollView的源码可以发现，它有一个属性keyboardShouldPersistTaps，默认值为false，表示只要点击当前focus组件外的地方，都会引起键盘的收起。

这个是不能连续focus TextInput的原因，引起键盘收起后，还捕获了点击事件，使得focus失效。 所以我们应该把ScrollView的这个属性设置为 true，让键盘一直保持弹出状态。

它还有一个属性keyboardDismissMode，是枚举类型：  代表键盘在drag的时候是否收起

 'none'    是默认值，代表键盘一直展开
 
 'on-drag'      代表 ScrollView拖动的时候 键盘收起     在android下无效
 
'interactive'     翻译过来是互动的时候键盘收起   

但是发现在android和ios下也没什么效果

尝试着用这个属性去收起键盘，但是效果不好，并且不兼容android。

最终我们对ScrollView的操作是加上属性    keyboardShouldPersistTaps = true

如何判断点击到的组件是TextInput ？

#### 2）如何获取触摸事件的ID
阅读View的原文我们可以发现属性  onStartShouldSetResponderCapture，这个属性接收一个回调函数，函数原型是 function(evt): bool，在触摸事件开始（touchDown）的时候，RN 容器组件会回调此函数，询问组件是否要劫持事件响应者设置，自己接收事件处理，如果返回 true，表示需要劫持，如果返回false，表示不劫持。

传给回调函数的event里，包含一个触摸事件参数nativeEvent。nativeEvent 的详细内容如下：

- identifier：触摸的 ID，一般对应手指，在多点触控的时候，用来区分是哪个手指的触摸事件；
- locationX 和 locationY：触摸点相对组件的位置；
- pageX 和 pageY：触摸点相对于屏幕的位置；
- timestamp：当前触摸的事件的时间戳，可以用来进行滑动计算；
- target：接收当前触摸事件的组件 ID；
- changedTouches：evt数组，从上次回调上报的触摸事件，到这次上报之间的所有事件数组。因为用户触摸过程中，会产生大量事件，有时候可能没有及时上报，系统用这种方式批量上报；
- touches：evt 数组，多点触摸的时候，包含当前所有触摸点的事件。
这里我们用到的是target属性，它就代表点击的组件ID。
#### 3）如何根据组件ID知道组件是否为TextInput
      React-Native官网的0.28版文档中，View和TextInput组件中都有属性onLayout，这个属性接收一个回调函数，函数原型是 function(evt)，在mount组件和layout的组件的时候触发该事件，传给回调函数的event里，参数nativeEvent，其中的target属性为该组件的ID。

      所以可以在TextInput组件layout时，将他们的ID存放在数组中，然后判断触发事件的组件ID是否在数组中，来确定该组件时候为TextInput。
      
      React-Native官网的0.28版文档中，View和TextInput组件中都有属性onLayout，这个属性接收一个回调函数，函数原型是 function(evt)，在mount组件和layout的组件的时候触发该事件，传给回调函数的event里，参数nativeEvent，其中的target属性为该组件的ID。
      
      所以可以在TextInput组件layout时，将他们的ID存放在数组中，然后判断触发事件的组件ID是否在数组。
      
      0.28版本之前 TextInput组件没有onLayout属性，所以在0.28版本中TextInput没有onLayout属性，hack的方法是用View包裹TextInput，然后给View加onLayout属性，
获取到的是View的组件ID，调试发现，View里面的TextInput的ID是外层View的ID+1，通过这种方法获取的TextInput的组件ID，在0.29以后的版本中，可以直接给TextInput加onLayout属性了。

### 4）如何控制键盘的收起
     react-native 中有dismissKeyboard模块，用于设置键盘的收起，直接调用该模块方法，即可收起键盘。
### 2.3 关键代码

```
const dismissKeyboard = require('dismissKeyboard');
const inputComponents = [];
  
    _onStartShouldSetResponderCapture (event) {
        let target = event.nativeEvent.target;
        if(!inputComponents.includes(target)) {
            dismissKeyboard();
        }
        return false;
    }
 
    _inputOnLayout(event){
        inputComponents.push(event.nativeEvent.target);
    }
  
<ScrollView ref="scrollView" keyboardShouldPersistTaps = {true} >
    <View onStartShouldSetResponderCapture={this._onStartShouldSetResponderCapture.bind(this)}>
          <TextInput onLayout={this._inputOnLayout.bind(this)} style={{flex: 1}}/>
    </View>
</ScrollView>
```
