# xSlider
A light and customize slider for jQuery

##options
name     | value       | description
---------|-------------|----
autoPlay | boolean     | Whether the automatic switching execution in finished loading
interval | millisecond | switching interval
speed    | millisecond | time during swicthing
nav      | boolean     | If it's setted be true, show the focus points
page     | boolean     | If it's setted be true, show the page nav on foot of the widget
scrollNum| number      | the number of switching items everytime
direction| 'rtl'or'ltr'| if it's setted be 'ltr', switching is from left to right.so like 'rtl'.default is 'ltr'
controls | boolen      | show the next button and prev button 
hoverStop| boolen      | when mouse over the widget, auto play stop. 

##dome
$('.class').GeoSlider({
    auto:true,
    speed:300
})
