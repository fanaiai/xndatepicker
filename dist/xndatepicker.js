'use strict';

//! Ftree.js
//! version : 1.0.0
//! authors : 范媛媛
//! create date:2021/01/01
//! update date:2021/01/05
// https://github.com/fanaiai/xndatepicker
function dynamicLoadJs(urllist) {
    for (var i = 0; i < urllist.length; i++) {

        var url = urllist[i];
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('script');
        link.src = url;
        var finelurl = '<script type="text/javascript" src=' + url + '><\/script>';
        document.getElementsByTagName('head')[0].appendChild(link);
        document.write(finelurl);
    }
}

function dynamicLoadCss(urllist) {
    for (var i = 0; i < urllist.length; i++) {
        var url = urllist[i];
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = url;
        head.appendChild(link);
    }
}
var scripts = document.getElementsByTagName("script");
var script = scripts[scripts.length - 1];
var s = document.querySelector ? script.src : script.getAttribute("src", 4); //IE8直接.src
// var s = document.currentScript.src;
var csspath = s.substr(0, s.lastIndexOf('/') - 0);
var csslist = ["//at.alicdn.com/t/font_2213760_as9380qm7dw.css", csspath + "/xndatepicker.css"];
var jslist = [csspath + "/xntimepicker.js"];
dynamicLoadCss(csslist);
dynamicLoadJs(jslist);
(function (window, $) {
    var format = {
        'week': 'YYYY-MM-DD',
        'date': 'YYYY-MM-DD',
        'daterange': 'YYYY-MM-DD',
        'datetime': 'YYYY-MM-DD HH:mm:ss',
        'datetimerange': 'YYYY-MM-DD HH:mm:ss',
        'month': 'YYYY-MM',
        'monthrange': 'YYYY-MM',
        'year': 'YYYY',
        'yearrange': 'YYYY',
        'multiple': 'YYYY-MM-DD'
    };
    var shortList = {
        'multiple': [],
        'week': [{ "name": "最近一周", "value": { startTime: moment().startOf('week'), endTime: moment().endOf('week') } }, { "name": "本月第一周", "value": { startTime: moment().startOf('month').startOf('week'), endTime: moment().startOf('month').endOf('week') } }, { "name": "本年第一周", "value": { startTime: moment().startOf('year').startOf('week'), endTime: moment().startOf('year').endOf('week') } }],
        'date': [{ "name": "今天", "value": { startTime: moment().startOf('day') } }, { "name": "昨天", "value": { startTime: moment().subtract(1, 'days').startOf('day') } }, { "name": "本周第一天", "value": { startTime: moment().startOf('week').startOf('day') } }, { "name": "本月第一天", "value": { startTime: moment().startOf('month').startOf('day') } }, { "name": "本年第一天", "value": { startTime: moment().startOf('year').startOf('day') } }],
        'datetime': [{ "name": "现在", "value": { startTime: moment() } }, { "name": "今天", "value": { startTime: moment().startOf('day') } }, { "name": "昨天", "value": { startTime: moment().subtract(1, 'days').startOf('day') } }, { "name": "本周第一天", "value": { startTime: moment().startOf('week').startOf('day') } }, { "name": "本月第一天", "value": { startTime: moment().startOf('month').startOf('day') } }, { "name": "本年第一天", "value": { startTime: moment().startOf('year').startOf('day') } }],
        'daterange': [{ "name": "最近一天", "value": { startTime: moment().subtract(1, 'days'), endTime: moment() } }, { "name": "最近三天", "value": { startTime: moment().subtract(3, 'days').startOf('day'), endTime: moment() } }, { "name": "最近一周", "value": { startTime: moment().subtract(7, 'days').startOf('day'), endTime: moment() } }, { "name": "最近一月", "value": { startTime: moment().subtract(1, 'months').startOf('day'), endTime: moment() } }, { "name": "最近一年", "value": { startTime: moment().subtract(1, 'years').startOf('day'), endTime: moment() } }, { "name": "本月", "value": { startTime: moment().startOf('month').startOf('day'), endTime: moment() } }, { "name": "本年", "value": { startTime: moment().startOf('year').startOf('day'), endTime: moment() } }],
        'datetimerange': [{ "name": "今天", "value": { startTime: moment().startOf('day'), endTime: moment() } }, { "name": "最近一天", "value": { startTime: moment().subtract(1, 'days'), endTime: moment() } }, { "name": "最近三天", "value": { startTime: moment().subtract(3, 'days'), endTime: moment() } }, { "name": "最近一周", "value": { startTime: moment().subtract(7, 'days'), endTime: moment() } }, { "name": "最近一月", "value": { startTime: moment().subtract(1, 'months'), endTime: moment() } }, { "name": "最近一年", "value": { startTime: moment().subtract(1, 'years'), endTime: moment() } }, { "name": "本月", "value": { startTime: moment().startOf('month'), endTime: moment() } }, { "name": "本年", "value": { startTime: moment().startOf('year'), endTime: moment() } }],
        'month': [{ "name": "本月", "value": { startTime: moment().startOf('month'), endTime: moment() } }, { "name": "上月", "value": { startTime: moment().subtract(1, 'month').startOf('month'), endTime: moment() } }, { "name": "本年一月", "value": { startTime: moment().startOf(1, 'year').startOf('month'), endTime: moment() } }],
        'monthrange': [{ "name": "最近一月", "value": { startTime: moment().subtract(1, 'months').startOf('month'), endTime: moment() } }, { "name": "最近两月", "value": { startTime: moment().subtract(2, 'months').startOf('month'), endTime: moment() } }, { "name": "最近三月", "value": { startTime: moment().subtract(3, 'months').startOf('month'), endTime: moment() } }, { "name": "最近一年", "value": { startTime: moment().subtract(1, 'years').startOf('month'), endTime: moment() } }, { "name": "本年", "value": { startTime: moment().startOf('year').startOf('month'), endTime: moment() } }],
        'year': [{ "name": "本年", "value": { startTime: moment().startOf('year') } }, { "name": "去年", "value": { startTime: moment().subtract(1, 'years').startOf('year') } }, { "name": "三年前", "value": { startTime: moment().subtract(3, 'years').startOf('year') } }, { "name": "五年前", "value": { startTime: moment().subtract(5, 'years').startOf('year') } }],
        'yearrange': [{ "name": "最近一年", "value": { startTime: moment().startOf('year'), endTime: moment() } }, { "name": "最近两年", "value": { startTime: moment().subtract(2, 'years').startOf('year'), endTime: moment() } }, { "name": "最近三年", "value": { startTime: moment().subtract(3, 'years').startOf('year'), endTime: moment() } }, { "name": "最近五年", "value": { startTime: moment().subtract(5, 'years').startOf('year'), endTime: moment() } }, { "name": "最近十年", "value": { startTime: moment().subtract(10, 'years').startOf('year'), endTime: moment() } }]
    };
    var option = {
        showWeek: true, //是否显示周几
        placeholder: '请选择',
        shortList: [],
        locale: {
            month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            monthHead: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            week: ['日', '一', '二', '三', '四', '五', '六'],
            clear: '清空',
            confirm: '确定',
            yearHeadSuffix: '年'
        }, //显示信息
        confirmFirst: true, //第一次就搜索
        separator: ' 到 ', //双日历模式下的链接符
        showType: 'modal', //显示样式
        linkPanels: false, //双日历面板联动
        showClear: true, //是否显示清除按钮
        autoConfirm: true, //单日历模式，和周日历模式，是否自动确定
        showShortKeys: true, //是否显示快捷选项
        autoFillDate: true, //自动变更element里面的值，如果自动变更，则按照插件样式显示
        firstDayOfWeek: 7, //周起始日 1-7
        theme: 'default', //主题
        multipleDates: [], //当为多选日期类型时的初始值
        startTime: '', //初始开始时间
        endTime: '', //初始结束时间
        minDate: '', //最小时间
        maxDate: '' //最大时间
    };

    function XNDatepicker(targetDom, options, onConfirm) {
        this.$targetDom = $(targetDom);
        this.option = $.extend(false, option, options);
        this.type = this.option.type;
        this.format = this.type.indexOf('year') > -1 ? 'YYYY' : this.type.indexOf('month') > -1 ? 'YYYY-MM' : this.type.indexOf('time') > -1 ? 'YYYY-MM-DD' : 'YYYY-MM-DD';
        this.option.startTime = moment(this.option.startTime || moment());
        this.option.endTime = moment(this.option.endTime || moment());
        this.option.minDate && (this.option.minDate = moment(this.option.minDate));
        this.option.maxDate && (this.option.maxDate = moment(this.option.maxDate));
        this.onConfirm = onConfirm;
        this.selectedDate = {}; //已确认的时间
        this.date1 = this.option.startTime.clone(); //当前选择的起始时间
        this.date2 = this.option.endTime.clone(); //当前选择的起始时间
        this.tempdate1; //左侧选择器的时间
        this.tempdate2; //右侧选择器的时间
        this.multipleDates = $.extend(true, [], this.option.multipleDates || []);
        if (!options.shortList) {
            this.option.shortList = shortList[this.type];
        }
        if (!options.format) {
            this.option.format = format[this.type];
        }
        this.id = this.getRandomString();
        this.show = false;
        this.eventList = {};
        this.init();
        this.addPosEvent();
        this.addTargetEvent();
    }

    XNDatepicker.prototype = {
        init: function init() {
            this.setCurrentTime({ startTime: this.option.startTime, endTime: this.option.endTime });
            this.rendDatePicker();
            this.setPosition();
            this.addEvent();
            this.initCallback();
            this.initTimePicker();
            this.rendHoverStyle();
            this.setDate();
            this.confirm(false, true);
        },
        resetCurrentTime: function resetCurrentTime(startTime, endTime) {
            //显示日历的时候，重新设置当前的日期
            if (this.type == 'multiple') {
                this.multipleDates = $.extend(true, [], this.selectedMultiple || []);
            }
            if (!this.selectedDate[0]) {
                this.selectedDate[0] = moment();
            }
            if (!this.selectedDate[1] && (this.type == 'week' || this.type.indexOf('range') > -1)) {
                this.selectedDate[1] = moment();
            }
            if (startTime) {
                this.selectedDate[0] = moment(startTime);
            }
            if (endTime) {
                this.selectedDate[1] = moment(endTime);
            }
            this.setCurrentTime({ startTime: this.selectedDate[0], endTime: this.selectedDate[1] });
            this.setCurrentDay();
            this.updateCurrentTime(1);
            this.updateCurrentTime(2);
            this.setPosition();
        },
        getCurrentTargetTime: function getCurrentTargetTime() {
            var str = '';
            if (this.$targetDom[0].nodeName == 'INPUT') {
                str = this.$targetDom[0].value;
            } else {
                str = this.$targetDom[0].innerHTML;
            }
            // console.log(str)
        },
        updateCurrentTime: function updateCurrentTime(num) {
            if (this['timepicker' + num]) {
                var date = moment(this.selectedDate[num - 1]).format('YYYY-MM-DD HH:mm:ss');
                this['timepicker' + num].updateCurrentTime(date);
            }
        },
        initTimePicker: function initTimePicker() {
            var that = this;
            if (this.type == 'datetime' || this.type == 'datetimerange') {
                this.timepicker1 = new XNTimepicker(this.$container.find('.time1 .timecont'), {
                    time: that.selectedDate[0],
                    onConfirm: function onConfirm(res) {
                        var currentTime = moment(that.selectedDate[0]);
                        currentTime = currentTime.hours(res.value.hour);
                        currentTime = currentTime.minutes(res.value.minute);
                        currentTime = currentTime.seconds(res.value.second);
                        that.date1 = currentTime;
                        that.$container.find('.time1 .timecont>span').html(res.str);
                    }
                });
            }
            if (this.type == 'datetimerange') {
                this.timepicker2 = new XNTimepicker(this.$container.find('.time2 .timecont'), {
                    time: that.selectedDate[1],
                    onConfirm: function onConfirm(res) {
                        var currentTime = moment(that.selectedDate[1]);
                        currentTime = currentTime.hours(res.value.hour);
                        currentTime = currentTime.minutes(res.value.minute);
                        currentTime = currentTime.seconds(res.value.second);
                        that.date2 = currentTime;
                        that.$container.find('.time2 .timecont>span').html(res.str);
                    }
                });
            }
        },
        initCallback: function initCallback() {
            this.on('confirm', this.onConfirm);
        },
        addTargetEvent: function addTargetEvent() {
            var _this = this;

            var clickFunc = function clickFunc(e) {
                if (e.target == _this.$targetDom[0]) {
                    _this.changeShowStatus();
                } else if (!$(e.target).parents('.xndatepicker')[0] || $(e.target).parents('.xndatepicker')[0].id != _this.id) {

                    _this.changeShowStatus(true);
                }
            };
            this.removeClickEvent = function () {
                document.removeEventListener('click', clickFunc, true); //捕获阶段
            };
            document.addEventListener('click', clickFunc, true); //捕获阶段
        },
        changeShowStatus: function changeShowStatus(hide) {
            if (this.show || hide) {
                this.show = true;
                this.$container.slideUp(100);
            } else {
                this.$container.css({ display: 'block', opacity: '0' });
                this.resetCurrentTime();
                this.$container.animate({ 'opacity': 1 }, 200);
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

            top = top + targetHeight + 10;

            var trangletop = -6;
            var trangleleft = left + 20;
            var borderWidth = "1px 0 0 1px";

            if (top + domheight > wheight) {
                top = targetTop - domheight - 10;
                trangletop = domheight - 7;
                borderWidth = "0 1px 1px 0";
            }
            if (top < 0) {
                top = 0;
            }
            if (left + domwidth > wwidth) {
                left = targetLeft + targetWidth - domwidth;
                trangleleft = domwidth - 60;
            }
            if (left < 0) {
                left = 0;
            }
            this.$container[0].style.top = top + "px";
            this.$container[0].style.left = left + "px";
            this.$container.find('.xntriangle')[0].style.left = trangleleft + "px";
            this.$container.find('.xntriangle')[0].style.top = trangletop + "px";
            this.$container.find('.xntriangle')[0].style.borderWidth = borderWidth;
        },
        rendHoverStyle: function rendHoverStyle($t) {
            if ($t && (this.type.indexOf('year') < 0 && $t.hasClass('year-item') || this.type.indexOf('date') >= 0 && !$t.hasClass('day-item'))) {
                return;
            }

            var format = 'YYYY-MM';
            var curFormat = 'YYYY-MM-DD';
            if (this.type.indexOf('month') > -1) {
                curFormat = 'YYYY-MM';
            }
            if (this.type.indexOf('month') > -1) {
                curFormat = 'YYYY';
            }
            if (this.type.indexOf('month') > -1 || this.type.indexOf('year') > -1) {
                format = 'YYYY';
            }
            if (this.type.indexOf('week') > -1) {
                if ($t) {
                    var date = $t.attr('data-date');
                    var date1 = moment(date).subtract(parseInt(this.option.firstDayOfWeek) % 7, 'days').startOf('week').add(parseInt(this.option.firstDayOfWeek) % 7, 'days').format('YYYY-MM-DD');
                    var date2 = moment(date).subtract(parseInt(this.option.firstDayOfWeek) % 7, 'days').endOf('week').add(parseInt(this.option.firstDayOfWeek) % 7, 'days').format('YYYY-MM-DD');
                    if (this.option.minDate && moment(date2).isBefore(this.option.minDate)) {
                        return;
                    }
                    if (this.option.maxDate && moment(date1).isAfter(this.option.maxDate)) {
                        return;
                    }
                    if (this.option.minDate && moment(date1).isBefore(this.option.minDate)) {
                        date1 = moment(this.option.minDate).format('YYYY-MM-DD');
                    }
                    if (this.option.maxDate && moment(date2).isAfter(this.option.maxDate)) {
                        date2 = moment(this.option.maxDate).format('YYYY-MM-DD');
                    }
                    // else {
                    //     return;
                    // }
                    this.$container.find(".hover").removeClass("hover");
                    this.$container.find("[data-date='" + date1 + "']").addClass('hover');
                    this.$container.find("[data-date='" + date2 + "']").addClass('hover');
                    this.$container.find("[data-date='" + date1 + "']").nextUntil(this.$container.find("[data-date='" + date2 + "']")).addClass('hover');
                } else {
                    this.$container.find(".hover").removeClass("hover");
                }
                this.$container.find(".cur-date").eq(0).nextUntil(this.$container.find(".cur-date").eq(1)).addClass('hover');
                this.$container.find(".cur-date").eq(1).addClass('right-date');
                return;
            }
            if ($t && !$t.hasClass('active-day')) {
                return;
            }
            if (this.type.indexOf('range') < 0) {
                this.$container.find(".cur-date").addClass('circle-date');
                return;
            }
            this.$container.find(".hover").removeClass("hover");

            if ($t && !this.$container.find(".cur-date")[1] && !this.date2) {
                var date1 = this.$container.find(".cur-date").eq(0).attr('data-date');
                var date2 = $t.attr('data-date');
                $('.circle-date').removeClass('circle-date');
                $('.right-date').removeClass('right-date');
                var isBefore = moment(date1).isBefore(date2);
                if (this.type.indexOf('year') > -1) {
                    var inSame = date1 - date1 % 12 == date2 - date2 % 12;
                } else {
                    var inSame = moment(date1).format(format) == moment(date2).format(format);
                }
                if (date1 != date2) {
                    if (inSame) {
                        if (isBefore) {
                            this.$container.find(".cur-date").eq(0).nextUntil($t).addClass("hover");
                        } else {
                            this.$container.find(".cur-date").eq(0).addClass('right-date');
                            $t.nextUntil(this.$container.find(".cur-date").eq(0)).addClass("hover");
                        }
                    } else {
                        if (isBefore) {
                            this.$container.find(".cur-date").eq(0).nextAll('span').addClass("hover");
                            $t.prevAll('span').addClass("hover");
                        } else {
                            this.$container.find(".cur-date").eq(0).addClass('right-date');
                            this.$container.find(".cur-date").eq(0).prevAll('span').addClass("hover");
                            $t.nextAll('span').addClass("hover");
                        }
                    }
                }
            } else {
                var date1 = this.$container.find(".cur-date").eq(0).attr('data-date');
                var date2 = this.$container.find(".cur-date").eq(1).attr('data-date');
                if (this.$container.find(".cur-date").eq(0).hasClass('circle-date')) {
                    date2 = date1;
                }
                $('.circle-date').removeClass('circle-date');
                $('.right-date').removeClass('right-date');
                var isBefore = moment(date1, 'YYYY-MM-DD').isBefore(moment(date2, 'YYYY-MM-DD'));
                if (this.type.indexOf('year') > -1) {
                    var inSame = date1 - date1 % 12 == date2 - date2 % 12;
                } else {
                    var inSame = moment(date1).format(format) == moment(date2).format(format);
                }
                // if(this.type=='monthrange'){
                //     console.log(date1,date2)
                //     console.log(isBefore)
                // }


                if (date1 != date2) {
                    if (inSame) {
                        if (isBefore) {
                            this.$container.find(".cur-date").eq(0).nextUntil(this.$container.find(".cur-date").eq(1)).addClass("hover");
                        } else {
                            this.$container.find(".cur-date").eq(1).nextUntil(this.$container.find(".cur-date").eq(0)).addClass("hover");
                        }
                    } else {
                        this.$container.find(".cur-date").eq(0).nextAll('span').addClass("hover");
                        this.$container.find(".cur-date").eq(1).prevAll('span').addClass("hover");
                    }
                }
            }
            if (date1 == date2) {
                this.$container.find(".cur-date").eq(0).addClass('circle-date');
            } else {
                this.$container.find(".cur-date").eq(1).addClass('right-date');
            }
        },
        setDate: function setDate() {
            var _this2 = this;

            var date = {};

            this.$container.find(".cur-date").each(function (i, ele) {
                var datekey = $(ele).parents(".date-item").attr("data-id");
                var day = moment($(ele).attr('data-date'), 'YYYY-MM-DD').format('YYYY-MM-DD');
                var time = '';
                if (_this2.type.indexOf('time')) {
                    var time = ' ' + _this2.$container.find(".time" + (i + 1) + " .timecont>span").html();
                }
                date[i] = moment(day + time, 'YYYY-MM-DD HH:mm:ss');
                _this2.$container.find(".time" + (i + 1) + ">input").val(day);
                if (_this2.$container.find(".circle-date")[0] == ele) {
                    var j = 1;
                    date[j] = moment(day + time, 'YYYY-MM-DD HH:mm:ss');
                    _this2.$container.find(".time" + (j + 1) + ">input").val(day);
                }
            });
            // this.selectedDate = date;
            this.date1 = date[0];
            this.date2 = date[1];
            // console.log(this.date2.format(this.format))
            // this.rendTimeDate();
        },

        // rendTimeDate() {
        //     // if(Object.keys(this.selectedDate)<2){
        //     //
        //     // }
        //     // else{
        //     //     this.$container.find("time"+)
        //     // }
        // },
        rendOtherDateList: function rendOtherDateList(otherdatenum) {
            if (this.type.indexOf('range') < 0) {
                return;
            }
            var datenum = otherdatenum == 1 ? 2 : 1;
            if (otherdatenum < datenum) {
                if (this.type.indexOf('date') > -1 || this.type.indexOf('week') > -1) {
                    if (moment(this['tempdate' + otherdatenum].format('YYYY-MM')).isSameOrAfter(this['tempdate' + datenum].format('YYYY-MM')) || this.option.linkPanels) {
                        this['tempdate' + datenum] = this['tempdate' + otherdatenum].clone().add(1, 'months');
                        this.geneDateList(this["tempdate" + datenum], this.$container.find(".dater" + datenum));
                    }
                }
                if (this.type.indexOf('month') > -1) {
                    if (this['tempdate' + otherdatenum].isSameOrAfter(this['tempdate' + datenum], 'year') || this.option.linkPanels) {
                        this['tempdate' + datenum] = this['tempdate' + otherdatenum].clone().add(1, 'years');
                    }
                    this.rendMonth(datenum);
                }
                if (this.type.indexOf('year') > -1) {
                    var year1 = this['tempdate' + otherdatenum].format('YYYY');
                    var year2 = this['tempdate' + datenum].format('YYYY');
                    var year1P = year1 - year1 % 12;
                    var year2P = year2 - year2 % 12;

                    if (year1P >= year2P || this.option.linkPanels) {
                        this['tempdate' + datenum] = this['tempdate' + otherdatenum].clone().add(12, 'years');
                    }
                    this.rendYears(datenum);
                }
            } else {
                if (this.type.indexOf('date') > -1 || this.type.indexOf('week') > -1) {
                    if (moment(this['tempdate' + otherdatenum].format('YYYY-MM')).isSameOrBefore(this['tempdate' + datenum].format('YYYY-MM')) || this.option.linkPanels) {
                        this['tempdate' + datenum] = this['tempdate' + otherdatenum].clone().subtract(1, 'months');
                        this.geneDateList(this["tempdate" + datenum], this.$container.find(".dater" + datenum));
                    }
                }
                if (this.type.indexOf('month') > -1) {
                    if (this['tempdate' + otherdatenum].isSameOrBefore(this['tempdate' + datenum], 'year') || this.option.linkPanels) {
                        this['tempdate' + datenum] = this['tempdate' + otherdatenum].clone().subtract(1, 'years');
                    }
                    this.rendMonth(datenum);
                }
                if (this.type.indexOf('year') > -1) {
                    var year1 = this['tempdate' + otherdatenum].format('YYYY');
                    var year2 = this['tempdate' + datenum].format('YYYY');
                    var year1P = year1 - year1 % 12;
                    var year2P = year2 - year2 % 12;
                    if (year1P <= year2P || this.option.linkPanels) {
                        this['tempdate' + datenum] = this['tempdate' + otherdatenum].clone().subtract(12, 'years');
                    }
                    this.rendYears(datenum);
                }
            }
            // console.log(this["tempdate" + otherdatenum].format('YYYY-MM-DD'))
        },
        addEvent: function addEvent() {
            var _this3 = this;

            var mouseMoveFunc = function mouseMoveFunc(e) {
                var $t = $(e.target);
                if ($t.parents('.xndatepicker')[0] == _this3.$container[0]) {
                    if ($t.hasClass("day-item") || $t.hasClass("month-item") || $t.hasClass("year-item")) {
                        _this3.rendHoverStyle($t);
                    }
                } else {
                    // this.rendHoverStyle();
                }
            };
            this.removeMoveEvent = function () {
                document.removeEventListener('mousemove', mouseMoveFunc); //捕获阶段
            };
            document.addEventListener("mousemove", mouseMoveFunc);
            this.$container[0].addEventListener("click", function (e) {
                var $t = $(e.target);
                var datenum = $t.parents(".dater1")[0] ? 1 : 2;
                if ($t.hasClass("skip-date")) {
                    var func = $t.attr('data-func');
                    var unit = $t.attr('data-unit');
                    var newdate = $.extend(true, {}, moment(_this3["tempdate" + datenum]));
                    newdate = newdate[func](1, unit + 's').startOf(unit);
                    if (_this3.checkDisable(newdate, unit, _this3.type, unit)) {
                        return;
                    }
                    _this3["tempdate" + datenum][func](1, unit + 's');
                    if (unit == 'year') {
                        if (_this3.option.minDate && _this3["tempdate" + datenum].isBefore(_this3.option.minDate)) {
                            _this3["tempdate" + datenum] = moment(_this3.option.minDate);
                        }
                        if (_this3.option.maxDate && _this3["tempdate" + datenum].isAfter(_this3.option.maxDate)) {
                            _this3["tempdate" + datenum] = moment(_this3.option.maxDate);
                        }
                    }
                    _this3.geneDateList(_this3["tempdate" + datenum], _this3.$container.find(".dater" + datenum));
                    _this3.rendOtherDateList(datenum);
                }
                if ($t.hasClass("month-prev-year")) {
                    _this3.rendMonth(datenum);
                }
                if ($t.hasClass("month-next-year")) {
                    _this3.rendMonth(datenum);
                }
                if ($t.hasClass("year-next-year")) {
                    var newdate = $.extend(true, {}, moment(_this3["tempdate" + datenum]));
                    newdate = newdate['add'](12, 'years').startOf('year');
                    if (_this3.checkDisable(newdate, 1, 'year')) {
                        return;
                    }
                    _this3["tempdate" + datenum] = _this3["tempdate" + datenum].add(12, 'years');
                    _this3.rendYears(datenum);
                    _this3.rendOtherDateList(datenum);
                }
                if ($t.hasClass("year-prev-year")) {
                    var newdate = $.extend(true, {}, moment(_this3["tempdate" + datenum]));
                    newdate = newdate.startOf('year');
                    if (_this3.checkDisable(newdate, -1, 'year')) {
                        return;
                    }
                    _this3["tempdate" + datenum] = _this3["tempdate" + datenum].subtract(12, 'years');
                    _this3.rendYears(datenum);
                    _this3.rendOtherDateList(datenum);
                }

                if (_this3.type.indexOf('date') > -1 && $t.hasClass("active-day") || $t.hasClass("day-item") && _this3.type.indexOf('week') > -1) {
                    _this3["date" + datenum] = _this3["tempdate" + datenum].date($t.html()).clone();
                    _this3.setCurClass($t);
                    _this3.setDate();
                    if ((_this3.type.indexOf('date') > -1 || _this3.type.indexOf('week') > -1) && $t.hasClass('day-item')) {
                        _this3.autoConfirm($t);
                    }
                }
                if (_this3.type.indexOf('multiple') > -1 && $t.hasClass("day-item") && !$t.hasClass("disable-day")) {
                    var date = $t.attr('data-date');
                    var key = _this3.multipleDates.indexOf(date);
                    if (key > -1) {
                        _this3.multipleDates.splice(key, 1);
                        $t.removeClass('cur-date');
                    } else {
                        _this3.multipleDates.push(date);
                        $t.addClass('cur-date');
                    }
                }
                if ($t.hasClass("confirm-date")) {
                    _this3.confirm();
                }
                if ($t.hasClass("current-date")) {
                    _this3.currentdate();
                }
                if ($t.hasClass("clear-date")) {
                    _this3.cleardate();
                }
                if ($t.hasClass("year") || $t.hasClass('month-info')) {
                    _this3.rendYears(datenum);
                }
                if ($t.hasClass("month")) {
                    _this3.rendMonth(datenum);
                }
                if ($t.hasClass("year-item") && !$t.hasClass("disable-year")) {
                    if (_this3.type.indexOf('year') > -1) {
                        _this3["date" + datenum] = moment($t.html());
                        _this3.setCurClass($t);
                        _this3.setDate();
                        _this3.autoConfirm($t);
                    } else {
                        _this3["tempdate" + datenum] = _this3["tempdate" + datenum].year($t.html());
                        _this3.rendMonth(datenum);
                        // this['date'+datenum]=null;
                        _this3.rendOtherDateList(datenum);
                        // this.geneDateList(this["tempdate" + datenum], this.$container.find(".dater" + datenum));
                    }
                }
                if ($t.hasClass("month-item") && !$t.hasClass("disable-month")) {
                    if (_this3.type.indexOf('month') > -1) {
                        _this3["date" + datenum] = moment($t.attr('data-date'));
                        _this3.setCurClass($t);
                        _this3.setDate();
                        _this3.autoConfirm($t);
                    } else {
                        _this3["tempdate" + datenum] = moment($t.attr('data-date'));
                        // this['date'+datenum]=null;
                        _this3.geneDateList(_this3["tempdate" + datenum], _this3.$container.find(".dater" + datenum));
                        _this3.rendOtherDateList(datenum);
                    }
                }
                if ($t[0].nodeName == 'LI' && $t.parents('.shortcut')[0]) {
                    var index = $t.parent().find("LI").index($t);
                    _this3.setCurrentTime(_this3.option.shortList[index].value);
                    _this3.setCurrentDay();
                    _this3.updateCurrentTime(1);
                    _this3.updateCurrentTime(2);
                    _this3.autoConfirm();
                }
                _this3.rendHoverStyle();
                // this.rendOtherDateList(datenum);
            });
        },
        autoConfirm: function autoConfirm() {
            if (!this.option.autoConfirm) {
                return;
            }
            if (this.type.indexOf('range') < 0 && this.type.indexOf('time') < 0 || this.type.indexOf('week') > -1) {
                this.confirm();
            } else if (this.type.indexOf('range') > -1 && this.date2 && this.date1 && this.type.indexOf('time') < 0) {
                this.confirm();
            }
        },
        setCurClass: function setCurClass($t) {
            if (this.type.indexOf('week') > -1) {
                var date = $t.attr('data-date');
                var date1 = moment(date).clone().subtract(parseInt(this.option.firstDayOfWeek) % 7, 'days').startOf('week').add(parseInt(this.option.firstDayOfWeek) % 7, 'days').format('YYYY-MM-DD');
                // var date1 = moment(date).clone().startOf('week').format('YYYY-MM-DD')
                var date2 = moment(date).clone().subtract(parseInt(this.option.firstDayOfWeek) % 7, 'days').endOf('week').add(parseInt(this.option.firstDayOfWeek) % 7, 'days').format('YYYY-MM-DD');
                if (this.option.minDate && moment(date1).isBefore(this.option.minDate)) {
                    date1 = moment(this.option.minDate).format('YYYY-MM-DD');
                }
                if (this.option.maxDate && moment(date2).isAfter(this.option.maxDate)) {
                    date2 = moment(this.option.maxDate).format('YYYY-MM-DD');
                }
                $(".cur-date").removeClass('cur-date');
                this.date1 = moment(date1);
                this.date2 = moment(date2);
                this.$container.find('[data-date="' + this.date1.format('YYYY-MM-DD') + '"]').addClass('cur-date');
                this.$container.find('[data-date="' + this.date2.format('YYYY-MM-DD') + '"]').addClass('cur-date');
            } else {
                if (this.type.indexOf('range') > -1) {
                    if (this.$container.find(".cur-date").length > 1 || this.$container.find(".circle-date")[0]) {
                        this.$container.find(".cur-date").removeClass('cur-date');
                    } else {
                        if (this.$container.find(".cur-date").eq(0).attr('data-date') == $t.attr('data-date')) {
                            $t.addClass("circle-date");
                        }
                    }
                } else {
                    $(".cur-date").removeClass('cur-date');
                }
                $t.addClass("cur-date");
            }
        },
        setCurrentTime: function setCurrentTime(date1) {
            //修正当前时间与最大最小值
            if (this.option.maxDate && moment(date1.startTime).isAfter(this.option.maxDate)) {
                date1.startTime = moment(this.option.maxDate).clone();
            }
            if (this.option.minDate && moment(date1.endTime).isBefore(this.option.minDate)) {
                date1.endTime = moment(this.option.minDate).clone();
            }
            if (this.option.minDate && moment(date1.startTime).isBefore(this.option.minDate)) {
                date1.startTime = moment(this.option.minDate).clone();
            }
            if (this.option.maxDate && moment(date1.endTime).isAfter(this.option.maxDate)) {
                date1.endTime = moment(this.option.maxDate).clone();
            }
            var date = $.extend(true, {}, date1);
            date1.startTime && (date.startTime = date1.startTime.clone());
            date1.endTime && (date.endTime = date1.endTime.clone());
            this.selectedDate[0] = date1.startTime;
            this.selectedDate[1] = date1.endTime;
            var startTime = date.startTime;
            if (this.type.indexOf('range') > -1) {
                //双日历时
                if (this.type.indexOf('year') > -1) {
                    var endTime = date.endTime;
                    var endTime1 = endTime.format('YYYY');
                    var startTime1 = startTime.format('YYYY');
                    var endYearP = endTime1 - endTime1 % 12;
                    var startYearP = startTime1 - startTime1 % 12;
                    if (startYearP + 12 >= endYearP) {
                        this.tempdate2 = endTime;
                        this.tempdate1 = endTime.clone().subtract('12', 'years');
                    } else {
                        this.tempdate1 = startTime;
                        this.tempdate2 = endTime;
                    }
                } else if (this.type.indexOf('date') > -1) {
                    var endTime = date.endTime;
                    if (startTime.format('YYYY-MM') == endTime.format('YYYY-MM')) {
                        this.tempdate1 = moment(endTime).subtract('1', 'months');
                        this.tempdate2 = endTime;
                    } else {
                        this.tempdate1 = startTime;
                        this.tempdate2 = endTime;
                    }
                } else if (this.type.indexOf('month') > -1) {
                    var endTime = date.endTime;
                    if (startTime.format('YYYY') == endTime.format('YYYY')) {
                        this.tempdate2 = endTime;
                        this.tempdate1 = moment(endTime).clone().subtract('1', 'years');
                    } else {
                        this.tempdate1 = startTime;
                        this.tempdate2 = endTime;
                    }
                }
            } else if (this.type != 'week') {
                //单日历时
                this.date1 = startTime;
                this.date2 = date.endTime;
                this.tempdate1 = this.date1.clone();
                delete this.selectedDate[1];
            } else {
                //周日历时
                var date1 = moment(startTime).clone().subtract(parseInt(this.option.firstDayOfWeek) % 7, 'days').startOf('week').add(parseInt(this.option.firstDayOfWeek) % 7, 'days');
                // var date1 = moment(startTime).startOf('week');
                var date2 = date1.clone().add(6, 'days');
                if (this.option.minDate && moment(date1).isBefore(this.option.minDate)) {
                    date1 = moment(this.option.minDate.clone());
                }
                if (this.option.maxDate && moment(date2).isAfter(this.option.maxDate)) {
                    date2 = moment(this.option.maxDate.clone());
                }
                this.tempdate1 = date1;
                this.tempdate2 = date2;
                this.selectedDate[0] = date1.clone();
                this.selectedDate[1] = date2.clone();
            }
            this.date1 = this.selectedDate[0].clone();
            this.selectedDate[1] && (this.date2 = this.selectedDate[1].clone());
        },
        setCurrentDay: function setCurrentDay() {
            if (this.type.indexOf('range') < 0) {
                this.$container.find(".dater2").remove();
                this.$container.find(".time2").remove();
            }
            if (this.type.indexOf('time') < 0) {
                this.$container.find(".timepicker").remove();
            }
            if (this.type.indexOf('year') > -1) {
                this.rendYears(1);
                this.rendYears(2);
            } else if (this.type.indexOf('month') > -1) {
                this.rendMonth(1);
                this.rendMonth(2);
            } else {
                this.geneDateList(this.tempdate1, this.$container.find(".dater1"));
                this.geneDateList(this.tempdate2, this.$container.find(".dater2"));
            }
            if (this.type != 'multiple') {
                for (var i in this.selectedDate) {
                    var yearmonth = this.selectedDate[i].format('YYYY-MM');
                    var date = this.selectedDate[i].format('DD');
                    var time = this.selectedDate[i].format('HH:mm:ss');
                    this.$container.find(".active-day[data-date='" + yearmonth + '-' + date + "']").addClass("cur-date");
                }
                this.setCurrentClass();
            }
        },
        setCurrentClass: function setCurrentClass() {
            if (this.selectedDate[0]) {
                var date1 = this.selectedDate[0].format(this.format);
                this.$container.find('.active-day[data-date="' + date1 + '"]').addClass('cur-date');
            }
            if (this.selectedDate[1]) {
                var date2 = this.selectedDate[1].format(this.format);
                this.$container.find('.active-day[data-date="' + date2 + '"]').addClass('cur-date');
                if (this.type == 'week') {
                    this.$container.find('.day-item[data-date="' + date2 + '"]').addClass('cur-date');
                }
                if (this.selectedDate[0].format(this.format) == this.selectedDate[1].format(this.format)) {
                    this.$container.find('.active-day[data-date="' + date2 + '"]').addClass('circle-date');
                }
            }
            this.rendHoverStyle();
        },
        cleardate: function cleardate() {
            this.date1 = '';
            this.date2 = '';
            this.selectedDate[0] = '';
            this.selectedDate[1] = '';
            this.selectedMultiple = [];
            this.confirm(true);
        },
        currentdate: function currentdate() {
            this.date1 = moment();
            this.date2 = moment();
            this.confirm();
        },
        confirm: function confirm(clear, isFirst) {
            var canconfirm = false;
            if (this.type == 'multiple') {
                if (clear) {
                    if (isFirst && this.option.confirmFirst || !isFirst) {
                        this.trigger("confirm", { startTime: this.selectedMultiple });
                    }
                    var showstr = '';
                    canconfirm = true;
                } else {
                    this.selectedMultiple = this.multipleDates;
                    if (isFirst && this.option.confirmFirst || !isFirst) {
                        this.trigger("confirm", { startTime: this.selectedMultiple });
                    }
                    var showstr = this.multipleDates.join(',');
                    canconfirm = true;
                }
            } else {
                this.date1 && (this.selectedDate[0] = this.date1.clone());
                this.date2 && (this.selectedDate[1] = this.date2.clone());

                if (clear) {
                    if (isFirst && this.option.confirmFirst || !isFirst) {
                        this.trigger("confirm", { startTime: this.selectedDate[0], endTime: this.selectedDate[1] });
                    }
                    var showstr = '';
                    canconfirm = true;
                }
                if (this.type.indexOf('range') > -1 && this.date2 || this.type.indexOf('week') > -1) {
                    if (isFirst && this.option.confirmFirst || !isFirst) {
                        this.trigger("confirm", { startTime: this.selectedDate[0], endTime: this.selectedDate[1] });
                    }
                    try {
                        var showstr = this.selectedDate[0].format(this.option.format) + this.option.separator + this.selectedDate[1].format(this.option.format);
                    } catch (e) {
                        var showstr = '';
                    }
                    canconfirm = true;
                } else if (this.type.indexOf('range') < 0 && this.date1) {
                    if (isFirst && this.option.confirmFirst || !isFirst) {
                        this.trigger("confirm", { startTime: this.selectedDate[0] });
                    }
                    try {
                        var showstr = this.selectedDate[0].format(this.option.format);
                    } catch (e) {
                        var showstr = '';
                    }
                    canconfirm = true;
                }
            }

            if (!canconfirm) {
                return;
            }
            this.changeShowStatus(true);
            if (!this.option.autoFillDate) {
                return;
            }
            if (this.$targetDom[0].nodeName == 'INPUT') {
                this.$targetDom[0].value = showstr;
            } else {
                this.$targetDom[0].innerHTML = showstr;
            }
            this.$targetDom.addClass('iconfont-xndatepicker icon-xndatepickerrili xndatepicker-input');
            this.$targetDom.attr('data-placeholder', this.option.placeholder);
        },
        rendMonth: function rendMonth(datenum) {
            if (!this.$container.find('.dater' + datenum)[0]) {
                return;
            }
            var $html = $('\n                <div class="year-picker">\n                    <div class="prev">\n                    <span class="iconfont-xndatepicker icon-xndatepickerprev1 month-prev-year skip-date" data-unit="year" data-func="subtract"></span>\n</div>\n                    <div class="month-info"></div>\n                    <div class="next">\n                    <span class="iconfont-xndatepicker icon-xndatepickerprev1 month-next-year skip-date" data-unit="year" data-func="add"></span>\n</div>\n                </div>\n                <div class="month-list">\n                    \n</div>\n            ');
            this.$container.find('.dater' + datenum).empty().append($html);
            var monthlist = this.getMonthList(datenum);
            this.$container.find('.dater' + datenum).find(".month-list").append(monthlist);
            this.setTodayDot('month');
        },
        getMonthList: function getMonthList(datenum) {
            var curYear = moment(this['tempdate' + datenum]).format('YYYY');
            this.$container.find(".dater" + datenum + " .month-info")[0].innerHTML = curYear;
            var html = '';
            for (var i = 0; i < 12; i++) {
                var disable = !((this.option.minDate && moment(this.option.minDate).startOf('month').isSameOrBefore(curYear + '/' + (i + 1) + '/01') || !this.option.minDate) && (this.option.maxDate && moment(this.option.maxDate).startOf('month').isSameOrAfter(curYear + '/' + (i + 1) + '/01') || !this.option.maxDate));
                html += '<span class="month-item ' + (disable ? 'disable-month' : 'active-day') + '" data-date="' + moment(curYear + '/' + (i + 1), 'YYYY/MM').format('YYYY-MM') + '">' + this.option.locale.month[i] + "</span>";
            }
            return html;
        },
        rendYears: function rendYears(datenum) {
            if (!this.$container.find('.dater' + datenum)[0]) {
                return;
            }
            var $html = $('\n                <div class="year-picker">\n                    <div class="prev">\n                    <span class="iconfont-xndatepicker icon-xndatepickerprev1 year-prev-year"></span>\n</div>\n                    <div class="year-info"></div>\n                    <div class="next">\n                    <span class="iconfont-xndatepicker icon-xndatepickerprev1 year-next-year"></span>\n</div>\n                </div>\n                <div class="year-list">\n                    \n</div>\n            ');
            this.$container.find('.dater' + datenum).empty().append($html);
            var yearlist = this.getYearList(datenum);
            this.$container.find('.dater' + datenum).find(".year-list").append(yearlist);
            this.setTodayDot('year');
        },
        getYearList: function getYearList(datenum) {
            var chooseYear = moment(this['tempdate' + datenum]).format('YYYY');
            var curYear = chooseYear - chooseYear % 12;
            this.$container.find(".dater" + datenum + " .year-info")[0].innerHTML = curYear + '-' + (parseInt(curYear) + 11);
            var html = '';
            for (var i = 0; i < 12; i++) {
                var disable = !((this.option.minDate && moment(this.option.minDate).startOf('year').isSameOrBefore(parseInt(curYear) + i + '/01/01') || !this.option.minDate) && (this.option.maxDate && moment(this.option.maxDate).startOf('year').isSameOrAfter(parseInt(curYear) + i + '/01/01') || !this.option.maxDate));
                html += '<span class="year-item ' + (disable ? 'disable-year' : 'active-day') + '" data-date="' + (parseInt(curYear) + i) + '">' + (parseInt(curYear) + i) + "</span>";
            }
            return html;
        },
        getDateCont: function getDateCont() {
            var html = '<div class="year-picker">\n                            <div class="prev">\n                            <span class="iconfont-xndatepicker icon-xndatepickerprev prev-year skip-date" data-unit="year" data-func="subtract"></span>\n                            <span class="iconfont-xndatepicker icon-xndatepickerprev1 prev-month skip-date" data-unit="month" data-func="subtract"></span>\n</div>\n                            <div class="year-info"></div>\n                            <div class="next">\n                            <span class="iconfont-xndatepicker icon-xndatepickerprev1 next-month skip-date" data-unit="month" data-func="add"></span>\n                            <span class="iconfont-xndatepicker icon-xndatepickerprev next-year skip-date" data-unit="year" data-func="add"></span>\n</div>\n                        </div>';
            if (this.option.showWeek) {
                html += '<div class="week">';
                for (var i = parseInt(this.option.firstDayOfWeek); i < parseInt(this.option.firstDayOfWeek) + 7; i++) {
                    html += '<span>' + this.option.locale.week[i % 7] + '</span>';
                }
                html += '</div>';
            }

            html += '<div class="dater">\n                        </div>';
            return html;
        },
        rendDatePicker: function rendDatePicker() {
            this.$container = $('<div class="xndatepicker ' + this.type + '" id="' + this.id + '">\n        <div class="xn-top">\n            <div class="shortcut">\n                \n            </div>\n            <div class="date-main">\n                <div class="timepicker">\n                    <div class="timeitem time1">\n                        <input>\n                        <div class="timecont">\n                        <span></span>\n</div>\n                    </div>\n                    <div class="timeitem time2">\n                        <input>\n                        <div class="timecont">\n                        <span></span>\n</div>\n                    </div>\n                </div>\n                <div class="datepicker">\n                    <div class="date-item dater1" data-id="1">\n                        ' + this.getDateCont() + '\n                    </div>\n                    <div class="date-item dater2" data-id="2">\n                        ' + this.getDateCont() + ('\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class="xn-bottom">\n<!--            <a  class="xn-btn current-date">\u73B0\u5728</a>-->\n            <a  class="xn-btn clear-date">' + this.option.locale.clear + '</a>\n            <a class="xn-btn confirm-date">' + this.option.locale.confirm + '</a>\n        </div>\n        <div class="xntriangle"></div>\n    </div>'));
            $(document.body).append(this.$container);
            this.changeShowStatus(true);
            this.setCurrentDay();
            this.geneShortList();
            if (this.type.indexOf('range') < 0 && this.type.indexOf('time') < 0 && this.type != 'multiple' && this.option.autoConfirm) {
                this.$container.find('.confirm-date').remove();
            } else {
                if (!this.option.showClear && this.option.autoConfirm && this.type != 'multiple') {
                    this.$container.find('.xn-bottom').remove();
                }
            }
            if (!this.option.showClear) {
                this.$container.find('.clear-date').remove();
            }
            if (!this.option.showShortKeys || this.option.shortList.length < 1) {
                this.$container.find('.shortcut').remove();
            }
        },
        geneShortList: function geneShortList() {
            var ul = '<ul>';
            for (var i = 0; i < this.option.shortList.length; i++) {
                ul += '<li>' + this.option.shortList[i].name + '</li>';
            }
            ul += '</ul>';
            this.$container.find('.shortcut').empty().append(ul);
        },
        _getDaysNum: function _getDaysNum(date) {
            var ynow = date.year();
            var mnow = date.month();
            var m_days = new Array(31, 28 + this.is_leap(ynow), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31); //每个月的天数
            return m_days[mnow];
        },
        geneDateList: function geneDateList(curdate, $cont) {
            if (!$cont || !curdate || this.type.indexOf('date') < 0 && this.type != 'week' && this.type != 'multiple') {
                return;
            }
            var date = curdate.clone();

            $cont.empty().append(this.getDateCont());
            var ynow = date.year();
            var mnow = date.month() + 1;
            var firstday = moment(date).startOf('month').day() - parseInt(this.option.firstDayOfWeek);
            if (firstday < 0) {
                firstday += 7;
            }
            var m_days = this._getDaysNum(date);
            var l_days = this._getDaysNum(moment(date).subtract(1, 'months'));
            var ldates = [];
            for (var i = firstday - 1; i >= 0; i--) {
                ldates.push({ day: l_days - i });
            }
            for (var _i = 0; _i < m_days; _i++) {
                ldates.push({
                    iscur: true,
                    disable: this.checkDisable(moment(ynow + '/' + mnow + '/' + (_i + 1), 'YYYY/MM/DD'), 0, this.type, 'date'),
                    day: _i + 1
                });
            }
            var l = ldates.length;
            for (var _i2 = 0; _i2 < 42 - l; _i2++) {
                ldates.push({ day: _i2 + 1, isnext: true });
            }
            this._rendDayHtml(ldates, $cont, ynow + '/' + mnow);
            this._rendYearHtml(date, $cont);
            if (this.type == 'multiple') {
                for (var _i3 = 0; _i3 < this.multipleDates.length; _i3++) {
                    this.$container.find('span[data-date=' + this.multipleDates[_i3] + ']').addClass('cur-date');
                }
            }
            // console.log(this.tempdate1,this.date1,this.selectedDate[0])
        },
        checkDisable: function checkDisable(date, dir, type, unit) {
            var disable = true;
            if (!this.option.minDate && !this.option.maxDate) {
                return false;
            }
            if (this.type.indexOf('year') > -1 || type == 'year') {
                var year = date.format('YYYY');
                var min = this.option.minDate ? moment(this.option.minDate).format('YYYY') : 0;
                var max = this.option.maxDate ? moment(this.option.maxDate).format('YYYY') : year;
                var yearP = year - year % 12 - 12;
                var minP = min - min % 12;
                var maxP = max - max % 12;
                if ((dir > 0 || minP <= yearP) && (dir < 0 || maxP >= yearP + 12)) {
                    disable = false;
                }
            } else {
                var format = 'YYYY-MM';
                if (unit == 'year') {
                    format = 'YYYY';
                }
                if (unit == 'date') {
                    format = 'YYYY-MM-DD';
                }
                if ((!this.option.minDate || this.option.minDate && this.option.minDate.format(format) <= date.format(format)) && (!this.option.maxDate || this.option.maxDate && this.option.maxDate.format(format) >= date.format(format))) {
                    disable = false;
                }
            }
            return disable;
        },
        _rendYearHtml: function _rendYearHtml(date, $cont) {
            //需要重新生成哦
            var ynow = date.year();
            var mnow = date.month() + 1;
            $cont.find(".year-info").html("<span class='year'>" + ynow + this.option.locale.yearHeadSuffix + "<\/span><span class='month'>" + this.option.locale.monthHead[mnow - 1] + "<\/span>");
        },
        _rendDayHtml: function _rendDayHtml(datelist, $cont, year) {
            var $c = $cont.find(".dater");
            if ($c.length < 1) {
                $cont.append('<div class="dater"></div>');
            }
            $c.empty();
            for (var i = 0; i < 6; i++) {
                // let ul = document.createElement("ul")
                for (var j = i * 7; j < i * 7 + 7; j++) {
                    var li = document.createElement("span");
                    li.classList.add("day-item");
                    if (datelist[j].iscur) {
                        if (!datelist[j].disable) {
                            li.classList.add("active-day");
                        }
                        li.setAttribute("data-date", moment(year + '/' + datelist[j].day, 'YYYY/MM/DD').format('YYYY-MM-DD'));
                    } else {
                        if (datelist[j].isnext) {
                            li.setAttribute("data-date", moment(year + '/' + datelist[j].day, 'YYYY/MM/DD').add(1, 'months').format('YYYY-MM-DD'));
                        } else {
                            li.setAttribute("data-date", moment(year, 'YYYY/MM').subtract(1, 'months').date(datelist[j].day).format('YYYY-MM-DD'));
                        }
                    }
                    if (datelist[j].disable) {
                        li.classList.add("disable-day");
                    }
                    li.innerHTML = datelist[j].day;
                    $c.append(li);
                    // ul.append(li)
                }
                // $c.append(ul)
            }
            this.setTodayDot('day');
        },
        is_leap: function is_leap(year) {
            var res;
            return year % 100 == 0 ? res = year % 400 == 0 ? 1 : 0 : res = year % 4 == 0 ? 1 : 0;
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
        },
        _setData: function _setData(_key, $watch) {
            var _this4 = this;

            // console.log(_key)
            Object.defineProperty(this, _key, {
                get: function get() {
                    // console.log(this[_key])
                    return _this4[_key];
                },
                set: function set(val) {
                    var oldVal = _this4[_key];
                    // if (oldVal === val) return val;
                    console.log(val);

                    _this4[_key] = val;

                    // typeof $watch === 'function' && (
                    //     $watch.call(this, val, oldVal)
                    // );
                    $watch(val, oldVal);
                    console.log(val);
                    return val;
                }
            });
        },
        _getBaseType: function _getBaseType(target) {
            var typeStr = Object.prototype.toString.apply(target);

            return typeStr.slice(8, -1);
        },
        watch: function watch(key, callback) {
            this._setData(key, callback);
        },
        setTodayDot: function setTodayDot(type) {
            var date = moment().format('YYYY-MM-DD');
            if (type == 'year') {
                date = moment().format('YYYY');
            }
            if (type == 'month') {
                date = moment().format('YYYY-MM');
            }
            this.$container.find('.' + type + '-item[data-date=' + date + ']').addClass('is-today');
        },

        destroy: function destroy() {
            this.$container.remove();
            this.removeMoveEvent();
            this.removeClickEvent();
        }
    };
    window.XNDatepicker = XNDatepicker;
})(window, jQuery);