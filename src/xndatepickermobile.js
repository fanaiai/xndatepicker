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
    'week': {format:'YYYY-MM-DD',scrolllist:['YYYY','M','D']},
    'date': {format:'YYYY-MM-DD',scrolllist:['YYYY','M','D']},
    'daterange': 'YYYY-MM-DD',
    'datetime': {format:'YYYY-MM-DD HH:mm:ss',scrolllist:['YYYY','M','D','H','m','s']},
    'datetimerange': 'YYYY-MM-DD HH:mm:ss',
    'month': {format:'YYYY-MM',scrolllist:['YYYY','M']},
    'monthrange': 'YYYY-MM',
    'year': {format:'YYYY',scrolllist:['YYYY']},
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
        this.$t = $(targetDom);
        this.$t.addClass('xndatepicker-mobile-input')
        let t=document.createElement('div');
        this.$targetDom=$(t)
        this.$t.append(t)
        let i=document.createElement('i');
        i.classList.add('icon-xndatepickershanchu')
        i.classList.add('iconfont-xndatepicker')
        i.classList.add('clear-btn')
        this.$t.append(i)
        option = $.extend(true, {}, defaultoption, options);
        this.type=option.type;
        if (!options.shortList) {
            option.shortList = shortList[this.type]
        }
        this.id = this.getRandomString();
        this.initDate();
        this.eventList={};
        this.init();
    }

    initDate(){
        let minDate = dayjs(option.minDate)
        let maxDate = dayjs(option.maxDate || dayjs())
        let startTime = dayjs(option.startTime || dayjs())
        this.format=option.format||(format[option.type].format)
        this.scrolllist=format[option.type].scrolllist;
        this.formatDate(maxDate,'maxDate')
        this.formatDate(minDate,'minDate')
        this.formatDate(startTime,'startTime')
    }

    formatDate(date,type){
        this[type] = {
            full: date,
        }
        for(let i=0;i<this.scrolllist.length;i++){
            let f=this.scrolllist[i];
            this[type][f]=Number(date.format(f))
        }
    }

    init() {
        this.$setRem();
        this.rendPicker();
        this.addEvent();
    }
    addEvent(){
        this.$t.get(0).addEventListener('click',e=>{
            let $t=$(e.target);
            if($t.hasClass('clear-btn')){
                this.clear();
            }
            else{
                this.show();
            }
        })
        this.scrollContainer.addEventListener('click',e=>{
            let $t=$(e.target);
            if($t.hasClass('cancel-btn')){
                this.hide();
            }
            if($t.hasClass('confirm-btn')){
                this.fillInput(this.startTime.full.format(this.format))
                this.hide();
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
        this.rendScrollList()
        // this.rendM(true);
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
    clear(){

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
        this.trigger("confirm", {startTime: this.startTime, endTime: this.endTime, dayjs: dayjs})
    }
    trigger(type, data) {
        if (this.eventList[type]) {
            for (let i = 0; i < this.eventList[type].func.length; i++) {
                if (typeof this.eventList[type].func[i] == 'function')
                    this.eventList[type].func[i](data);
            }
        }
    }
    on(type, func) {
        if (!this.eventList[type]) {
            this.eventList[type] = {
                func: [func]
            }
        } else {
            this.eventList[type].func.push(func)
        }
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
            if((type=='YYYY' || type=='M') && this.scrolllist.includes('D')){
                this.startTime.D=1;
                this.rendD();
            }
            this.refreshCurrentShow();
        })
    }
    refreshCurrentShow(){
        this.startTime.full=dayjs(this.startTime.YYYY+'/'+this.startTime.M+'/'+this.startTime.D);
        this.currentContainer.innerHTML=this.startTime.full.format(this.format)
    }

    rendPicker() {
        this.initDateModal()
    }
    initScrollContainer(){
        let html=''
        for(let i= 0;i<this.scrolllist.length;i++){
            let f=this.scrolllist[i];
            html+=`<div class="${f}-container">
            <ul>
            </ul>
            <div class="current-bg"></div>
        </div>`
        }
        return html;
    }
    initDateModal() {
        let scrollContHtml=this.initScrollContainer();
        let dom = `<div class="xndatepicker-mobile-outer" id="${this.id}"><div class="xndatepicker-mobile">
    <div class="xndatepicker-head">
      <a class="cancel-btn">取消</a>
      <span class="current-time"></span>
      <a class="confirm-btn">确认</a>
</div>
    <div class="shortcut-list">
    
</div>
    <div class="scroll-container">
        ${scrollContHtml}
    </div>
</div></div>`
        $(document.body).append(dom)
        this.scrollContainer = document.querySelector('#' + this.id);
        for(let i= 0;i<this.scrolllist.length;i++){
            let f=this.scrolllist[i];
            this[f+'Container']= this.scrollContainer.querySelector('.'+f+'-container ul')
        }
        this.currentContainer=this.scrollContainer.querySelector('.current-time')
        this.geneShortList();
        this.rendScrollList();
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
    rendScrollList(){
        for(let i=0;i<this.scrolllist.length;i++){
            let f=this.scrolllist[i];
            this['rend'+f](true);
            // this.rendYear(true);
        }

    }
    rendYYYY(isinit) {
        this._rendList('YYYY', this.minDate.YYYY, this.maxDate.YYYY, this.startTime.YYYY, '年',isinit)
        // this.rendMonth(isinit);
    }

    rendM(isinit) {
        this._rendList('M', 1, 12, this.startTime.M, '月',isinit)
        // this.rendDay(isinit);
    }
    rendH(isinit) {
        this._rendList('H', 0, 23, this.startTime.M, '时',isinit)
        // this.rendDay(isinit);
    }
    rendm(isinit) {
        this._rendList('m', 0, 59, this.startTime.m, '分',isinit)
        // this.rendDay(isinit);
    }
    rends(isinit) {
        this._rendList('s', 0, 59, this.startTime.s, '秒',isinit)
        // this.rendDay(isinit);
    }
    rendD(isinit) {
        let num = this._getDaysNum(dayjs(this.startTime.YYYY+'/'+this.startTime.M))
        this._rendList('D', 1, num, this.startTime.D, '日',isinit)
    }

    _rendList(type, min, max, current, suffix,isinit) {
        let list = '<li></li><li></li>';
        for (let i = min; i <= max; i++) {
            list += `<li data-num="${i}">${i}${suffix}</li>`
        }
        list += '<li></li><li></li>';
        this[type + 'Container'].innerHTML = list;
        let y = current - min;
        console.log(current , min,y);
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
