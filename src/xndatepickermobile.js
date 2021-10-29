import './xndatepickermobile.css'
import XNQuery from './xnquery.js';
import IScroll from './iscroll.js'
import dayjs from './dayjs/esm/index.js';
import isSameOrBefore from './dayjs/esm/plugin/isSameOrBefore';
import isSameOrAfter from './dayjs/esm/plugin/isSameOrAfter'
import isoWeeksInYear from './dayjs/esm/plugin/isoWeeksInYear'
import WeekOfYear from './dayjs/esm/plugin/WeekOfYear'
import isLeapYear from './dayjs/esm/plugin/isLeapYear'
import advancedFormat from './dayjs/esm/plugin/advancedFormat'

dayjs.extend(isSameOrBefore)
dayjs.extend(isoWeeksInYear)
dayjs.extend(isSameOrAfter)
dayjs.extend(isLeapYear)
dayjs.extend(WeekOfYear)
dayjs.extend(advancedFormat)
let $ = XNQuery;
const format = {
    'week': 'YYYY-MM-DD',
    'date': 'YYYY-MM-DD',
    'daterange': 'YYYY-MM-DD',
    'datetime': 'YYYY-MM-DD HH:mm:ss',
    'datetimerange': 'YYYY-MM-DD HH:mm:ss',
    'month': 'YYYY-MM',
    'monthrange': 'YYYY-MM',
    'year': 'YYYY',
    'yearrange': 'YYYY',
    'multiple': 'YYYY-MM-DD',
    'weeknum': 'YYYY第w周',
    'weeknumrange': 'YYYY第w周'
}
const shortList = {
    'multiple': [],
    'week': [
        {"name": "最近一周", "value": {startTime: dayjs().startOf('week'), endTime: dayjs().endOf('week')}},
        {
            "name": "本月第一周",
            "value": {
                startTime: dayjs().startOf('month').startOf('week'),
                endTime: dayjs().startOf('month').endOf('week')
            }
        },
        {
            "name": "本年第一周",
            "value": {
                startTime: dayjs().startOf('year').startOf('week'),
                endTime: dayjs().startOf('year').endOf('week')
            }
        },
    ],
    'date': [
        {"name": "今天", "value": {startTime: dayjs().startOf('day')}},
        {"name": "昨天", "value": {startTime: dayjs().subtract(1, 'days').startOf('day')}},
        {"name": "本周第一天", "value": {startTime: dayjs().startOf('week').startOf('day')}},
        {"name": "本月第一天", "value": {startTime: dayjs().startOf('month').startOf('day')}},
        {"name": "本年第一天", "value": {startTime: dayjs().startOf('year').startOf('day')}},
    ],
    'datetime': [
        {"name": "现在", "value": {startTime: dayjs()}},
        {"name": "今天", "value": {startTime: dayjs().startOf('day')}},
        {"name": "昨天", "value": {startTime: dayjs().subtract(1, 'days').startOf('day')}},
        {"name": "本周第一天", "value": {startTime: dayjs().startOf('week').startOf('day')}},
        {"name": "本月第一天", "value": {startTime: dayjs().startOf('month').startOf('day')}},
        {"name": "本年第一天", "value": {startTime: dayjs().startOf('year').startOf('day')}},
    ],
    'daterange': [
        {"name": "最近一天", "value": {startTime: dayjs().subtract(1, 'days'), endTime: dayjs()}},
        {"name": "最近三天", "value": {startTime: dayjs().subtract(3, 'days').startOf('day'), endTime: dayjs()}},
        {"name": "最近一周", "value": {startTime: dayjs().subtract(7, 'days').startOf('day'), endTime: dayjs()}},
        {"name": "最近一月", "value": {startTime: dayjs().subtract(1, 'months').startOf('day'), endTime: dayjs()}},
        {"name": "最近一年", "value": {startTime: dayjs().subtract(1, 'years').startOf('day'), endTime: dayjs()}},
        {"name": "本月", "value": {startTime: dayjs().startOf('month').startOf('day'), endTime: dayjs()}},
        {"name": "本年", "value": {startTime: dayjs().startOf('year').startOf('day'), endTime: dayjs()}},
    ],
    'datetimerange': [
        {"name": "今天", "value": {startTime: dayjs().startOf('day'), endTime: dayjs()}},
        {"name": "最近一天", "value": {startTime: dayjs().subtract(1, 'days'), endTime: dayjs()}},
        {"name": "最近三天", "value": {startTime: dayjs().subtract(3, 'days'), endTime: dayjs()}},
        {"name": "最近一周", "value": {startTime: dayjs().subtract(7, 'days'), endTime: dayjs()}},
        {"name": "最近一月", "value": {startTime: dayjs().subtract(1, 'months'), endTime: dayjs()}},
        {"name": "最近一年", "value": {startTime: dayjs().subtract(1, 'years'), endTime: dayjs()}},
        {"name": "本月", "value": {startTime: dayjs().startOf('month'), endTime: dayjs()}},
        {"name": "本年", "value": {startTime: dayjs().startOf('year'), endTime: dayjs()}},
    ],
    'month': [
        {"name": "本月", "value": {startTime: dayjs().startOf('month'), endTime: dayjs()}},
        {"name": "上月", "value": {startTime: dayjs().subtract(1, 'month').startOf('month'), endTime: dayjs()}},
        {"name": "本年一月", "value": {startTime: dayjs().startOf(1, 'year').startOf('month'), endTime: dayjs()}},
    ],
    'monthrange': [
        {"name": "最近一月", "value": {startTime: dayjs().subtract(1, 'months').startOf('month'), endTime: dayjs()}},
        {"name": "最近两月", "value": {startTime: dayjs().subtract(2, 'months').startOf('month'), endTime: dayjs()}},
        {"name": "最近三月", "value": {startTime: dayjs().subtract(3, 'months').startOf('month'), endTime: dayjs()}},
        {"name": "最近一年", "value": {startTime: dayjs().subtract(1, 'years').startOf('month'), endTime: dayjs()}},
        {"name": "本年", "value": {startTime: dayjs().startOf('year').startOf('month'), endTime: dayjs()}},
    ],
    'year': [
        {"name": "本年", "value": {startTime: dayjs().startOf('year')}},
        {"name": "去年", "value": {startTime: dayjs().subtract(1, 'years').startOf('year')}},
        {"name": "三年前", "value": {startTime: dayjs().subtract(3, 'years').startOf('year')}},
        {"name": "五年前", "value": {startTime: dayjs().subtract(5, 'years').startOf('year')}},
    ],
    'yearrange': [
        {"name": "最近一年", "value": {startTime: dayjs().startOf('year'), endTime: dayjs()}},
        {"name": "最近两年", "value": {startTime: dayjs().subtract(2, 'years').startOf('year'), endTime: dayjs()}},
        {"name": "最近三年", "value": {startTime: dayjs().subtract(3, 'years').startOf('year'), endTime: dayjs()}},
        {"name": "最近五年", "value": {startTime: dayjs().subtract(5, 'years').startOf('year'), endTime: dayjs()}},
        {"name": "最近十年", "value": {startTime: dayjs().subtract(10, 'years').startOf('year'), endTime: dayjs()}},
    ],
    'weeknum': [
        {"name": "本周", "value": {startTime: dayjs().startOf('week')}},
        {"name": "上周", "value": {startTime: dayjs().subtract(1, 'weeks').startOf('week')}},
        {"name": "本月第一周", "value": {startTime: dayjs().startOf('month')}},
        {"name": "本年第一周", "value": {startTime: dayjs().startOf('year')}},
    ],
    'weeknumrange': [
        {"name": "当前周", "value": {startTime: dayjs().startOf('week'), endTime: dayjs().startOf('week')}},
        {
            "name": "最近两周",
            "value": {startTime: dayjs().subtract(2, 'weeks').startOf('week'), endTime: dayjs().startOf('week')}
        },
        {
            "name": "最近三周",
            "value": {startTime: dayjs().subtract(3, 'weeks').startOf('week'), endTime: dayjs().startOf('week')}
        },
        {
            "name": "最近五周",
            "value": {startTime: dayjs().subtract(5, 'weeks').startOf('week'), endTime: dayjs().startOf('week')}
        },
        {
            "name": "最近十周",
            "value": {startTime: dayjs().subtract(10, 'weeks').startOf('week'), endTime: dayjs().startOf('week')}
        },
    ]
}
const defaultoption = {
    showWeek: true,//是否显示周几
    placeholder: '请选择',//{start:'',end:''}
    shortList: [],
    locale: {
        month: [
            '一月',
            '二月',
            '三月',
            '四月',
            '五月',
            '六月',
            '七月',
            '八月',
            '九月',
            '十月',
            '十一月',
            '十二月',
        ],
        monthHead: [
            '1月',
            '2月',
            '3月',
            '4月',
            '5月',
            '6月',
            '7月',
            '8月',
            '9月',
            '10月',
            '11月',
            '12月',
        ],
        week: ['日', '一', '二', '三', '四', '五', '六'],
        clear: '清空',
        confirm: '确定',
        yearHeadSuffix: function (year) {
            return year + '年'
        },
        weekNum: function (weeknum) {
            return '第' + weeknum + '周'
        }
    },//显示信息
    confirmFirst: true,//第一次就搜索
    separator: ' 到 ',//双日历模式下的链接符
    showType: 'modal',//显示样式
    linkPanels: false,//双日历面板联动
    showClear: true,//是否显示清除按钮
    autoConfirm: true,//单日历模式，和周日历模式，是否自动确定
    showShortKeys: true,//是否显示快捷选项
    autoFillDate: true,//自动变更element里面的值，如果自动变更，则按照插件样式显示
    firstDayOfWeek: 7,//周起始日 1-7
    theme: 'default',//主题,blue,orange
    multipleDates: [],//当为多选日期类型时的初始值
    startTime: '',//初始开始时间
    endTime: '',//初始结束时间
    minDate: '1700/01/01',//最小时间
    maxDate: '',//最大时间
    disableDate: function (date, dayjs) {
        return false;//date为当前日期,如果当前日期为不可选日期，返回true
    }//不可选择日期
}
const scrollOption = {
    mouseWheel: true,
    scrollbars: false,
    snap: 'li'
};
let option = {};

class XNDatepickerMobile {
    constructor(targetDom, options, onConfirm) {
        this.$targetDom = $(targetDom);
        option = $.extend(true, {}, defaultoption, options);
        this.type=option.type;
        if (!options.shortList) {
            option.shortList = shortList[this.type]
        }
        this.id = this.getRandomString();
        let minDate = dayjs(option.minDate)
        let maxDate = dayjs(option.maxDate || dayjs())
        let startTime = dayjs(option.startTime || dayjs())
        this.format=option.format||format[option.type]
        this.formatDate(maxDate,'maxDate')
        this.formatDate(minDate,'minDate')
        this.formatDate(startTime,'startTime')

        this.init();
    }

    formatDate(date,type){
        this[type] = {
            full: date,
            year: Number(date.format('YYYY')),
            month: Number(date.format('M')),
            day: Number(date.format('D')),
        }
    }

    init() {
        this.$setRem();
        this.rendPicker();
        this.addEvent();
    }
    addEvent(){
        this.$targetDom.get(0).addEventListener('click',e=>{
            this.show();
        })
        this.scrollContainer.addEventListener('click',e=>{
            let $t=$(e.target);
            if($t.hasClass('cancel-btn')){
                this.hide();
            }
            if($t.hasClass('confirm-btn')){
                this.fillInput(this.startTime.full.format(this.format))
            }
            if ($t.get(0).nodeName == 'LI' && $t.parents('.shortcut-list').get(0)) {
                var index = $t.parent().find("LI").index($t.get(0));
                this.setCurrentTime(option.shortList[index].value);
                $(this.shortcutcontainer).find('.on').removeClass('on')
                $t.addClass('on')
                // if (this.type == 'multiple') {
                //     var startTime = Array.isArray(this.option.shortList[index].value.startTime) ? this.option.shortList[index].value.startTime : [this.option.shortList[index].value.startTime]
                //     this.multipleDates = startTime;
                // } else {
                //     this.setCurrentTime(this.option.shortList[index].value);
                // }
            }
        })
    }
    setCurrentTime(date){
        this.formatDate(date.startTime,'startTime')
        let y = this.startTime.year - this.minDate.year;
        this.rendYear(true)
        // this['year' + 'scroll'].goToPage(0, y || 0, 0,true)
        this.rendMonth(true);
        this.refreshCurrentShow();
    }
    show(){
        this.scrollContainer.classList.remove('xndatepicker-animate-mobile-out')
        this.scrollContainer.classList.add('xndatepicker-animate-mobile')
    }
    hide(){
        this.scrollContainer.classList.remove('xndatepicker-animate-mobile')
        this.scrollContainer.classList.add('xndatepicker-animate-mobile-out')
    }

    fillInput(showstr){
        if (!option.autoFillDate) {
            return;
        }
        if (this.$targetDom.get(0).nodeName == 'INPUT') {
            this.$targetDom.get(0).value = showstr;
        } else {
            this.$targetDom.get(0).innerHTML = showstr;
        }
        this.$targetDom.addClass('iconfont-xndatepicker icon-xndatepickerrili xndatepicker-input')
        this.$targetDom.attr('data-placeholder', option.placeholder.start)
    }

    _rendScroll(type, Y,isinit) {
        if(this[type + 'scroll']){
            this[type + 'scroll'].destroy();
            this[type + 'scroll'] = null;
        }
        this[type + 'scroll'] = new IScroll('.' + type + '-container', scrollOption);
        this[type + 'scroll'].goToPage(0, Y || 0, isinit?0:500)
        this[type + 'scroll'].on('scrollEnd', e => {
            let cur = this[type + 'Container'].querySelectorAll('li')[this[type + 'scroll'].currentPage.pageY + 2].getAttribute('data-num')
            this.startTime[type] = cur;
            if(type!='day'){
                this.startTime.day=1;
                this.rendDay();
            }
            this.refreshCurrentShow();
        })
    }
    refreshCurrentShow(){
        this.startTime.full=dayjs(this.startTime.year+'/'+this.startTime.month+'/'+this.startTime.day);
        this.currentContainer.innerHTML=this.startTime.full.format(this.format)
    }

    rendPicker() {
        this.initDateModal()
    }

    initDateModal() {
        let dom = `<div class="xndatepicker-mobile-outer" id="${this.id}"><div class="xndatepicker-mobile">
    <div class="xndatepicker-head">
      <a class="cancel-btn">取消</a>
      <span class="current-time"></span>
      <a class="confirm-btn">确认</a>
</div>
    <div class="shortcut-list">
    
</div>
    <div class="scroll-container">
        <div class="year-container">
            <ul>
            </ul>
            <div class="current-bg"></div>
        </div>
        <div class="month-container">
            <ul>
            </ul>
            <div class="current-bg"></div>
        </div>
        <div class="day-container">
            <ul>
            </ul>
            <div class="current-bg"></div>
        </div>
    </div>
</div></div>`
        $(document.body).append(dom)
        this.scrollContainer = document.querySelector('#' + this.id);
        this.yearContainer = this.scrollContainer.querySelector('.year-container ul')
        this.monthContainer = this.scrollContainer.querySelector('.month-container ul')
        this.dayContainer = this.scrollContainer.querySelector('.day-container ul')
        this.currentContainer=this.scrollContainer.querySelector('.current-time')
        this.geneShortList();
        this.rendYear(true);
    }
    geneShortList() {
        var ul = '<ul>'
        for (let i = 0; i < option.shortList.length; i++) {
            ul += '<li>' + option.shortList[i].name + '</li>'
        }
        ul += '</ul>'
        this.shortcutcontainer=this.scrollContainer.querySelector('.shortcut-list');
        this.scrollContainer.querySelector('.shortcut-list').innerHTML=ul;
        this['shortcut' + 'scroll'] = new IScroll('.' + 'shortcut-list', {
            scrollX:true,scrollY:false,mouseWheel: true,
            scrollbars: false,
            snap: 'li'
        });
    }
    rendYear(isinit) {
        this._rendList('year', this.minDate.year, this.maxDate.year, this.startTime.year, '年',isinit)
        this.rendMonth(isinit);
    }

    rendMonth(isinit) {
        this._rendList('month', 1, 12, this.startTime.month, '月',isinit)
        this.rendDay(isinit);
    }

    rendDay(isinit) {
        let num = this._getDaysNum(dayjs(this.startTime.year+'/'+this.startTime.month))
        this._rendList('day', 1, num, this.startTime.day, '日',isinit)
    }

    _rendList(type, min, max, current, suffix,isinit) {
        let list = '<li></li><li></li>';
        for (let i = min; i <= max; i++) {
            list += `<li data-num="${i}">${i}${suffix}</li>`
        }
        list += '<li></li><li></li>';
        this[type + 'Container'].innerHTML = list;
        let y = current - min;
        this._rendScroll(type, y,isinit)
    }

    _getDaysNum(date) {
        var ynow = date.year();
        var mnow = date.month();
        var m_days = new Array(31, 28 + this.is_leap(ynow), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);  //每个月的天数
        return m_days[mnow];
    }

    is_leap(year) {
        var res;
        return (year % 100 == 0 ? res = (year % 400 == 0 ? 1 : 0) : res = (year % 4 == 0 ? 1 : 0));
    }

    $setRem(width) {
        var docEl = document.documentElement
        let recalc = function () {
            var clientWidth = docEl.clientWidth;
            // if (!clientWidth || clientWidth>750) return;
            docEl.style.fontSize = 1 * (clientWidth / (width || 320)) + 'px';
        };
        recalc();
        if (!document.addEventListener) return;
        document.addEventListener('DOMContentLoaded', recalc, false);
    }

    getRandomString(len) {
        len = len || 8;
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz';
        /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        var maxPos = $chars.length;
        var pwd = '';
        for (let i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    }
}

window.XNDatepickerMobile = XNDatepickerMobile;
export default XNDatepickerMobile
