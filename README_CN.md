# xSlider
一个极其轻量的可自定义的jquery slider

[English introduction](https://github.com/ShangXinbo/xSlider/blob/master/README.md)

##说明
* 该插件基于jQuery,必须要在jquery引入之后执行，否则会报错。
* 该插件理论可兼容至IE6
* 该插件可以使用velocity,提高动画性能


##设置
参数     | 参数值      | 说明
---------|-------------|----
autoPlay | boolean     | 是否在组建加载完成后自动播放
interval | millisecond | 每个小项切换的时间间隔
speed    | millisecond | 每个切换耗费时间
nav      | boolean     | 是否显示底部焦点
page     | boolean     | 是否显示底部页码
scrollNum| number      | 每次滚动几个小项
direction| 'rtl'or'ltr'| rtl 滚动从右向左，相反ltr是左向右
controls | boolen      | 是否显示下一个和上一个的切换按钮 
hoverStop| boolen      | 鼠标划上停止自动播放，划出继续自动播放 

##示例
$('.class').xSlider({
    autoPlay:true,
    speed:300
})
