# xSlider
A light and customize slider for jQuery

[《中文说明》](https://github.com/ShangXinbo/xSlider/blob/master/README_CN.md)

##intro
* require jQuery
* support browsers : IE6+,safari,chrome,firefox,opera
* if velocity is defined,performance better(if $.Velocity is defined, $.fn.velocity replace $.fn.animate).Read about [Velocity](https://github.com/julianshapiro/velocity)

##options
name     | value       | description
---------|-------------|----
autoPlay | boolean     | Whether the automatic switching execution in finished loading
interval | millisecond | switching interval
speed    | millisecond | time during swicthing
foot     | false/Object| If it's setted be true, show the focus points. Default false.
scrollNum| number      | the number of switching items everytime
direction| 'rtl'or'ltr'| if it's setted be 'ltr', switching is from left to right.so like 'rtl'.default is 'ltr'
controls | boolen      | show the next button and prev button 
hoverStop| boolen      | when mouse over the widget, auto play stop. 

###options.foot
name     | value       | description
---------|-------------|----
className| boolean     | the class name of footer
nav      | boolean     | If it's setted be true, show the nav on foot of the widget
page     | boolean     | If it's setted be true, show the page on foot of the widget

##demo
```sh
$('.class').xSlider({
    autoPlay:true,
    speed:300,
    foot:{
        className:'xslider-nav',
        nav:true,
        page : false
    }
})
```

##License
GNU
