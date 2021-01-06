'use strict';

//! Ftree.js
//! version : 1.0.0
//! authors : 范媛媛
//! create date:2021/01/01
//! update date:2021/01/05
(function (window, $) {
    var option = {};

    function XNTimepicker(targetDom, options) {
        this.$targetDom = $(targetDom);
        this.option = $.extend(false, option, options);

        this.id = this.getRandomString();
        this.show = false;
        this.eventList = {};
        this.init();
        this.addPosEvent();
        this.addTargetEvent();
    }

    XNTimepicker.prototype = {
        init: function init() {
            this.rendtime();
            this.setPosition();
            this.addEvent();
            this.initCallback();
            this.initCurTime();
            // this.rendHoverStyle();
        },
        updateCurrentTime: function updateCurrentTime(time) {
            var hour = moment(time).format('HH');
            var minute = moment(time).format('mm');
            var second = moment(time).format('ss');
            var time1 = hour + ':' + minute + ':' + second;
            this.trigger("confirm", { str: time1, value: { hour: hour, minute: minute, second: second } });
        },
        initCurTime: function initCurTime() {
            this.updateCurrentTime(this.option.time);
        },
        initCallback: function initCallback() {
            this.on('confirm', this.option.onConfirm);
        },
        addTargetEvent: function addTargetEvent() {
            var _this = this;

            document.addEventListener('click', function (e) {
                if (e.target == _this.$targetDom[0] || _this.$targetDom.find(e.target)[0] && !$(e.target).parents('.xntimepicker')[0]) {
                    _this.changeShowStatus();
                } else if (!$(e.target).parents('.xntimepicker')[0] || $(e.target).parents('.xntimepicker')[0].id != _this.id) {

                    _this.changeShowStatus(true);
                }
            }, true); //捕获阶段
        },
        changeShowStatus: function changeShowStatus(hide) {
            if (this.show || hide) {
                this.show = true;
                this.$container.hide();
            } else {
                this.$container.show();
                this.setPosition();
            }
            this.show = !this.show;
        },

        addPosEvent: function addPosEvent() {
            var that = this;
            window.addEventListener("scroll", function () {
                that.setPosition();
            });
            window.addEventListener("resize", function () {
                that.setPosition();
            });
        },
        setPosition: function setPosition() {
            if (!this.$container[0]) {
                return;
            }
            var wwidth = document.documentElement.clientWidth;
            var wheight = document.documentElement.clientHeight;
            var curcolordom = this.$targetDom[0];
            var targetTop = curcolordom.getBoundingClientRect().top;
            var top = targetTop;
            var targetLeft = curcolordom.getBoundingClientRect().left;
            var left = targetLeft;
            var targetWidth = this.$targetDom.outerWidth();
            var targetHeight = this.$targetDom.outerHeight();
            var domwidth = this.$container.outerWidth();
            var domheight = this.$container.outerHeight();
            var top = top + targetHeight + 8;
            if (left + domwidth > wwidth) {
                left = targetWidth + targetLeft - domwidth;
            }
            // else{
            //     left=left+10+curcolordom.offsetWidth;
            // }
            // if(wheight-top<domheight){
            //     top=top-domheight-curcolordom.offsetHeight;
            // }
            // else{
            //     top=top
            // }
            // if(top<10){
            //     top=10
            // }
            // if(left<0){
            //     top=top+targetHeight+10;
            //     left=targetLeft+targetWidth-domwidth;
            // }
            this.$container[0].style.top = top + "px";
            this.$container[0].style.left = left + "px";
        },
        rendtime: function rendtime() {
            if (!this.option.format) {
                this.option.format = 'HH:mm:ss';
            }
            var html = '\n          <div class="xntimepicker" id="' + this.id + '">';
            var hours = '<ul class="hours">',
                minutes = '<ul class="minutes">',
                seconds = '<ul class="seconds">';
            var hourlist = [],
                minutelist = [],
                secondlist = [];
            for (var i = 0; i < 60; i++) {
                var n = i < 10 ? '0' + i : i;
                if (i < 24) {
                    hours += '<li data-i="' + n + '">' + n + '时</li>';
                }
                minutes += '<li data-i="' + n + '">' + n + '分</li>';
                seconds += '<li data-i="' + n + '">' + n + '秒</li>';
            }
            var option = '\n        <div><div class="time-cont">';
            option += hours + '</ul>';
            if (this.option.format.indexOf('mm') > -1) {
                option += minutes + '</ul>';
            }
            if (this.option.format.indexOf('ss') > -1) {
                option += seconds + '</ul>';
            }
            option += '</div><div class="time-btns"><span class="cur-time">\u5F53\u524D\u65F6\u95F4</span><a class="confirm-time">\u786E\u5B9A</a></div></div>';
            html += ' <div class="time-picker">' + option + '</div>\n         </div>\n      ';
            this.$targetDom.append(html);
            this.$container = $("#" + this.id);
            this.changeShowStatus(true);
        },
        addEvent: function addEvent() {
            var _this2 = this;

            this.$targetDom[0].addEventListener("click", function (e) {
                var $t = $(e.target);
                _this2.selectTime($t.parents(".timecont").eq(0), $t);
            });
            this.$container[0].addEventListener("click", function (e) {
                var $t = $(e.target);
                // if ($t.parents(".timecont")[0]) {
                //     this.selectTime($t.parents(".timecont").eq(0), $t);
                // }
                if ($t.hasClass("confirm-time")) {
                    _this2.confirm();
                }
                if ($t.hasClass("cur-time")) {
                    var hour = moment().format('HH');
                    var minute = moment().format('mm');
                    var second = moment().format('ss');
                    var time = hour + ':' + minute + ':' + second;
                    _this2.trigger("confirm", { str: time, value: { hour: hour, minute: minute, second: second } });
                    _this2.changeShowStatus(true);
                }
            });
        },
        selectTime: function selectTime($ele, $target) {
            var that = this;
            if ($target.parent().hasClass("timecont")) {
                // $ele.children("div").toggle();
                if ($ele.children("div").css("display") == 'none') {
                    return;
                }
                var curTime = $ele.children("span")[0].innerHTML.split(":");
                var hour = curTime[0];
                22;
                var minute = curTime[1];
                var second = curTime[2];
                $ele.find(".on").removeClass("on");
                $ele.find(".hours li[data-i=" + hour + "]").addClass("on");
                $ele.find(".minutes li[data-i=" + minute + "]").addClass("on");
                $ele.find(".seconds li[data-i=" + second + "]").addClass("on");
                $ele.find(".on").each(function (i, ele) {
                    var top = $(ele).position().top - 20;
                    $(ele).parent()[0].scrollBy(0, top);
                });
                return;
            }
            if ($target[0].nodeName == 'LI') {
                $target.parent().find("li").removeClass("on");
                $target.addClass("on");
                return;
            }
        },
        confirm: function confirm() {
            var hour = this.$container.find(".hours .on").attr("data-i") || '00';
            var minute = this.$container.find(".minutes .on").attr("data-i") || '00';
            var second = this.$container.find(".seconds .on").attr("data-i") || '00';
            var time = moment('1900-08-08 ' + hour + ':' + minute + ':' + second).format(this.format || 'HH:mm:ss');
            this.trigger("confirm", { str: time, value: { hour: hour, minute: minute, second: second } });
            this.changeShowStatus(true);
        },
        trigger: function trigger(type, data) {
            if (this.eventList[type]) {
                for (var i = 0; i < this.eventList[type].func.length; i++) {
                    this.eventList[type].func[i](data);
                }
            }
        },
        on: function on(type, func) {
            if (!this.eventList[type]) {
                this.eventList[type] = {
                    func: [func]
                };
            } else {
                this.eventList[type].func.push(func);
            }
        },
        getRandomString: function getRandomString(len) {
            len = len || 8;
            var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz';
            /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
            var maxPos = $chars.length;
            var pwd = '';
            for (var i = 0; i < len; i++) {
                pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
            }
            return pwd;
        }
    };
    window.XNTimepicker = XNTimepicker;
})(window, jQuery);