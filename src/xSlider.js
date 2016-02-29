/*
 * @fileOverview xSlider
 * @version   1.5.1
 * @date      2016-2-25
 * @author    Xinbo Shang
 *
 */

"use strict";

(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS Module
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals.
        factory(jQuery || Zepto);
    }
}(function($) {

    if (!$) {
        return console.warn('xSlider needs jQuery'); //jQuery must be required
    }

    var xSlider = function(element, options) {

        this.CONTAIN = $(element),                   //the warp of the widget
        this.UL = this.CONTAIN.find('ul'),
        this.LI = this.CONTAIN.find('li'),
        this.CURRENT_DISPLAY = 0,                //it's in order to record the current display
        this.IS_WORKING = false,                 //the switching status, to ensure one unfinished switch at most
        this.TIMER = '';                         //a timer to interval autoplay
        //this.GROUP_NUM,                        //The number of rolling piece 
        //this.OPTIONS; 

        this.setOptions(options);
        this.init();
    };
    xSlider.prototype = {

        setOptions: function(options) {
            var defaults = {
                autoPlay: true,     // it's auto play when this param is true 
                interval: 3000,     // the time between switch
                speed: 400,         // the time duiring switch
                foot: false,        // config of the showing footer
                /*{
                    className: '',  //  the className of focus footer 
                    nav: false,     // show the nav 
                    page: false,    // show the page of the slider
                }*/
                scrollNum: 1,       // switch nums of item everytime
                direction: 'ltr',   // ltr from left to right and rtl from right to left
                controls: true,     // show the left and right arrow buttons
                hoverStop: false    // stop autoplay when mouse over the slider  
            };
            this.OPTIONS = $.extend(defaults, options);
        },

        init: function() {
            var items = this.LI,
                scroll = this.OPTIONS.scrollNum;

            this.GROUP_NUM = Math.ceil(items.length / scroll);
            if (items.length > 1) {
                this.UL.css({
                    'width': (items.length + scroll * 2) * 100 + '%',
                    'margin-left': -scroll * 100 + '%',
                    'left': '0'
                });
                this.LI.css({
                    'float': 'left',
                    'listStyle': 'none',
                    'width': 100 / (items.length + scroll * 2) + '%'
                });
                this.UL.html(items.slice(0).clone()).append(items.slice(0, scroll).clone()).prepend(items.slice(-scroll).clone());

                this.setControls();
                this.setFoot();
                this.setHover();
                this.autoPlay();
            }
        },
        // set left and right buttons
        setControls: function() {
            if (this.OPTIONS.controls) {
                var _this = this;
                this.CONTAIN.append('<div class="xslider-arrow"><span class="prev"></span><span class="next"></span></div>').find('.xslider-arrow')
                .on('click', '.next', function(event) {
                    _this.toNext();
                })
                .on('click', '.prev', function(event) {
                    _this.toPrev();
                });
            }
        },
        // set nav and pages
        setFoot: function() {
            if (this.OPTIONS.foot) {
                var _this = this;
                var dom = '<div class="'+ this.OPTIONS.foot.className +'">';
                if (this.OPTIONS.foot.nav) {
                    for (var i = 0; i < this.GROUP_NUM; i++) {
                        if (i == 0) {
                            dom += '<span class="active"></span>';
                        } else {
                            dom += '<span></span>';
                        }
                    }
                }
                if (this.OPTIONS.foot.page) {
                    dom += '<p><font>1</font>/' + this.GROUP_NUM + '</p>';
                }
                dom += '</div>';
                this.CONTAIN.append(dom).find('.' + this.OPTIONS.foot.className).on('click', 'span', function() {
                    if (!_this.IS_WORKING) {
                        var pos = $('.'+ _this.OPTIONS.foot.className +' span', _this.CONTAIN).index($(this));
                        _this.animate(pos);
                    }
                });
            }
        },
        // when mouse over the widget, it's stop autoplay
        setHover: function() {
            if (this.OPTIONS.hover) {
                this.CONTAIN.hover(function() {
                    _this.stopAuto();
                }, function() {
                    _this.autoPlay();
                });
            }
        },
        autoPlay: function() {
            if (this.OPTIONS.autoPlay) {
                var _this = this;
                this.TIMER = setInterval(function() {
                    if (_this.OPTIONS.direction == 'rtl') {
                        _this.toPrev();
                    } else {
                        _this.toNext();
                    }
                }, _this.OPTIONS.interval);
            }
        },
        stopAuto: function() {
            if (this.OPTIONS.autoPlay) {
                var _this = this;
                clearInterval(_this.TIMER);
            }
        },
        // when autoplay,switch to the next
        toNext: function() {
            if (!this.IS_WORKING) {
                var next = this.CURRENT_DISPLAY + 1;
                this.animate(next);
            }
        },
        // when autoplay and the options.direction is rtl, switch to the prev
        toPrev: function() {
            if (!this.IS_WORKING) {
                var next = this.CURRENT_DISPLAY - 1;
                this.animate(next);
            }
        },
        animate: function(num) {
            var _this = this;
            this.IS_WORKING = true;
            this.stopAuto();
            this.UL.myAnimate({
                left: -num * 100 + '%'
            }, _this.OPTIONS.speed, function() {
                if (num < 0) {
                    _this.CURRENT_DISPLAY = _this.GROUP_NUM - 1;
                    _this.UL.css('left', -(_this.GROUP_NUM - 1) * 100 + '%');
                } else if (num >= _this.GROUP_NUM) {
                    _this.CURRENT_DISPLAY = 0;
                    _this.UL.css('left', 0);
                } else {
                    _this.CURRENT_DISPLAY = num;
                }
                _this.setPosition(_this.CURRENT_DISPLAY);
                _this.IS_WORKING = false;
                if(_this.OPTIONS.autoPlay){
                    _this.autoPlay();
                }
            });
        },
        setPosition: function(num) {
            if(this.OPTIONS.foot){
                var footer = this.CONTAIN.find('.' + this.OPTIONS.foot.className);
                if (this.OPTIONS.foot.nav) {
                    footer.find('span').removeClass('active').eq(num).addClass('active');
                }
                if (this.OPTIONS.foot.page) {
                    footer.find('font').html(num + 1);
                }
            }  
        }/*,
        destroy: function() {
            if (item.length > 1) {
                if (options.controls) {
                    $('.xslider-arrow', cont).remove();
                }
                if (options.nav||options.page) {
                    cont.find('.xslider-nav').remove();
                }
                this.stopAuto();
                working = false;
            }
        }*/
    };

    $.fn.myAnimate = $.Velocity ? $.fn.velocity : $.fn.animate;
    $.fn.xSlider = function(options) {
        //Multi element support
        return this.each(function() {
            if(!$(this).data('xSlider')){   // Prevent multiple instantiation
                $(this).data('xSlider',1);
                var s = new xSlider(this, options);
            } 
        });
    }
}));