import './theme.css';
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
    'week': {format: 'YYYY-MM-DD', scrolllist: ['year', 'month', 'date']},
    'date': {format: 'YYYY-MM-DD', scrolllist: ['year', 'month', 'date']},
    'daterange': {format: 'YYYY-MM-DD', scrolllist: ['year', 'month', 'date']},
    'datetime': {format: 'YYYY-MM-DD HH:mm:ss', scrolllist: ['year', 'month', 'date', 'hour', 'minute', 'second']},
    'datetimerange': {format: 'YYYY-MM-DD HH:mm:ss', scrolllist: ['year', 'month', 'date', 'hour', 'minute', 'second']},
    'month': {format: 'YYYY-MM', scrolllist: ['year', 'month']},
    'monthrange': {format: 'YYYY-MM', scrolllist: ['year', 'month']},
    'year': {format: 'YYYY', scrolllist: ['year']},
    'yearrange': {format: 'YYYY', scrolllist: ['year']},
    'multiple': {format: 'YYYY-MM-DD', scrolllist: ['year', 'month', 'date']},
    'weeknum': {format: 'YYYY第w周', scrolllist: ['year', 'week']},
    'weeknumrange': {format: 'YYYY第w周', scrolllist: ['year', 'week']},
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
        month:[
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
        // month:[
        //     'Jan',
        //     'Feb',
        //     'Mar',
        //     'Apr',
        //     'May',
        //     'Jun',
        //     'Jul',
        //     'Aug',
        //     'Sept',
        //     'Oct',
        //     'Nov',
        //     'Dec',
        // ],
        cancel:'取消',
        confirm: '确定',
        yearHeadSuffix: function (year) {
            return year + '年'
        },
        dateSuffix:'日',
        hourSuffix:'时',
        minuteSuffix:'分',
        secondSuffix:'秒',
        weekNum: function (weeknum) {
            return '第' + (weeknum+1) + '周'
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
    // theme: 'default',//主题,blue,orange
    multipleDates: [],//当为多选日期类型时的初始值
    startTime: '',//初始开始时间
    endTime: '',//初始结束时间
    minDate: '1900/01/01',//最小时间
    maxDate: '',//最大时间
    disableDate: function (date, dayjs) {
        return false;//date为当前日期,如果当前日期为不可选日期，返回true
    }//不可选择日期
}
const scrollOption = {
    mouseWheel: true,
    scrollbars: false,
    snap: 'li',
    tap: true,
    useTransform:false,
    HWCompositing:false,
};
let option = {};

class XNDatepickerMobile {
    constructor(targetDom, options, onConfirm) {
        this.onConfirm = onConfirm;
        this.option = $.extend(true, {}, defaultoption, options);
        this.type = this.option.type;
        this.initTargetDom(targetDom)
        if (!options.shortList) {
            this.option.shortList = shortList[this.type]
        }
        this.id = this.getRandomString();
        this.initDate();
        this.eventList = {};
        this.init();
    }

    initTargetDom(targetDom) {
        this.$t = $(targetDom);
        this.targetDom = targetDom;
        this.$t.addClass('xndatepicker-mobile-input')
        let num = ['startTime'];
        if (this.type.indexOf('range') > -1) {
            num.push('endTime')
        }
        for (let i = 0; i < num.length; i++) {
            let classname = num[i]
            let dateinput = document.createElement('div');
            dateinput.classList.add(classname)
            this.$t.append(dateinput)
            if (i == 0 && num.length == 2) {
                let span = document.createElement('span')
                span.innerHTML = this.option.separator;
                this.$t.append(span)
            }
            let innerHtml = `
            <div class="input" data-type="${classname}" data-placeholder="${this.option.placeholder[classname]}"></div>`
            if(this.option.showClear){
                innerHtml+=`<i class="icon-xndatepickershanchu iconfont-xndatepicker clear-btn"></i>`
            }
            dateinput.innerHTML = innerHtml
        }
    }

    initDate() {
        let minDate = dayjs(this.option.minDate || dayjs())
        let maxDate = dayjs(this.option.maxDate || dayjs())
        // let startTime = this.option.startTime ? dayjs(this.option.startTime) : null
        // let endTime = this.option.endTime ? dayjs(this.option.endTime) : null
        this.format = this.option.format || (format[this.option.type].format)
        this.scrolllist = this.option.scrolllist || format[this.option.type].scrolllist;
        this.formatDate(maxDate, 'maxDate')
        this.formatDate(minDate, 'minDate')
        // this.formatDate(startTime, 'startTime')
        // this.formatDate(endTime, 'endTime')
        // if (startTime && startTime.isBefore(this.minDate.full)) {
        //     this.cloneDate(this.minDate, this.startTime)
        // }
        // if (endTime && endTime.isAfter(this.maxDate.full)) {
        //     this.cloneDate(this.maxDate, this.endTime)
        // }
        // this.confirm = {
        //     startTime: $.extend(true, {}, this.startTime),
        //     endTime: $.extend(true, {}, this.endTime),
        // }
        // this.confirm.startTime.full = this.clone(this.startTime.full);
        // this.confirm.endTime.full = this.clone(this.endTime.full);
        this.formatInitialDate();
        this.initInput()
        // console.log(this.startTime,this.endTime);
    }
    formatInitialDate(istartTime=this.option.startTime,iendTime=this.option.endTime){
        let startTime = istartTime ? dayjs(istartTime) : null
        let endTime = iendTime ? dayjs(iendTime) : null
        this.formatDate(startTime, 'startTime')
        this.formatDate(endTime, 'endTime')
        if (startTime && startTime.isBefore(this.minDate.full)) {
            this.cloneDate(this.minDate, this.startTime)
        }
        if (endTime && endTime.isAfter(this.maxDate.full)) {
            this.cloneDate(this.maxDate, this.endTime)
        }
        this.confirm = {
            startTime: $.extend(true, {}, this.startTime),
            endTime: $.extend(true, {}, this.endTime),
        }
        this.confirm.startTime.full = this.clone(this.startTime.full);
        this.confirm.endTime.full = this.clone(this.endTime.full);
    }

    initInput() {
        this.fillInput(this['startTime'].full ? this['startTime'].full.format(this.format) : '', 'startTime')
        if (this.type.indexOf('range') > -1) {
            this.fillInput(this['endTime'].full ? this['endTime'].full.format(this.format) : '', 'endTime')
        }
    }

    clone(date) {
        if (date) {
            return date.clone()
        } else {
            return date;
        }
    }

    formatDate(date, type) {
        this[type] = {
            full: date,
        }
        for (let i = 0; i < this.scrolllist.length; i++) {
            let f = this.scrolllist[i];
            if (date) {
                this[type][f] = date[f]()
                if (f == 'month') {
                    this[type][f] += 1
                }
            } else {
                this[type][f] = ''
            }
        }
    }

    init() {
        this.$setRem();
        this.addTargetEvent();
        this.on('confirm', this.onConfirm);
    }

    addTargetEvent() {
        let targetClick=(e)=>{
            let $t = $(e.target);
            if ($t.hasClass('clear-btn')) {
                let type = 'endTime'
                if ($t.parent().hasClass('startTime')) {
                    type = 'startTime'
                }
                this.clear(type);
            } else if ($t.hasClass('input')) {
                this.currentType = $t.attr('data-type')
                this.show();
            }
        }
        this.removeTargetClick=()=>{
            this.targetDom.removeEventListener('click',targetClick)
        }
        this.targetDom.addEventListener('click',targetClick)
    }

    addEvent() {

        this.scrollContainer.addEventListener('click', e => {
            let $t = $(e.target);
            if ($t.hasClass('cancel-btn') || e.target == e.currentTarget) {
                this.hide();
            }
            if ($t.hasClass('confirm-btn')) {
                this.fillInput(this[this.currentType].full.format(this.format))
                this.hide();
            }
            if ($t.get(0).nodeName == 'LI' && $t.parents('.shortcut-list').get(0)) {
                var index = $t.parent().find("LI").index($t.get(0));
                this.chooseShortcut(this.option.shortList[index])

                $(this.shortcutcontainer).find('.on').removeClass('on')
                $t.addClass('on')
                // if (this.type == 'multiple') {
                //     var startTime = Array.isArray(this.this.option.shortList[index].value.startTime) ? this.this.option.shortList[index].value.startTime : [this.this.option.shortList[index].value.startTime]
                //     this.multipleDates = startTime;
                // } else {
                //     this.setCurrentTime(this.this.option.shortList[index].value);
                // }
            }
        })
    }

    chooseShortcut(shortcut) {
        let v = shortcut.value;
        this.formatDate(v.startTime, 'startTime')
        if (this.type.indexOf('range') > -1) {
            this.formatDate(v.endTime, 'endTime')
            let type = this.currentType == 'startTime' ? 'endTime' : 'startTime'
            this.fillInput(this[type].full.format(this.format), type)
        }
        this.rendScrollList()
        this.refreshCurrentShow();

    }

    show() {
        this.cloneDate(this.confirm[this.currentType], this[this.currentType])
        if (!this[this.currentType].full) {
            this.formatDate(this.maxDate.full, this.currentType)
        }
        this.rendPicker();
        this.addEvent();
        this.scrollContainer.classList.remove('xndatepicker-animate-mobile-out')
        this.scrollContainer.classList.add('xndatepicker-animate-mobile')
        this.refreshCurrentShow();
    }

    hide() {
        this.scrollContainer.classList.remove('xndatepicker-animate-mobile')
        this.scrollContainer.classList.add('xndatepicker-animate-mobile-out')
        setTimeout(() => {
            document.querySelectorAll("#" + this.id).forEach((e) => {
                e.remove();
            });
        }, 100)
    }

    clear(type) {
        this[type].full = null;
        this.fillInput('', type);
        this.trigger("confirm", {startTime: this.confirm.startTime.full, endTime: this.confirm.endTime.full, dayjs: dayjs})
    }

    fillInput(showstr, type) {
        let currentType = type || this.currentType;
        if (!this.option.autoFillDate) {
            return;
        }
        this.targetDom.querySelector('.' + currentType + ' .input').innerHTML = showstr;
        this.cloneDate(this[currentType], this.confirm[currentType])
        if (this.type.indexOf('range') > -1) {
            if (currentType == 'startTime' && this.confirm.endTime.full && this.confirm.endTime.full.isBefore(showstr)) {
                this.cloneDate(this.confirm.startTime, this.confirm.endTime)
                this.targetDom.querySelector('.' + 'endTime' + ' .input').innerHTML = showstr;
            }
            if (currentType == 'endTime' && this.confirm.startTime.full && this.confirm.startTime.full.isAfter(showstr)) {
                this.cloneDate(this.confirm.endTime, this.confirm.startTime)
                this.targetDom.querySelector('.' + 'startTime' + ' .input').innerHTML = showstr;
            }
        }
        !type && (this.trigger("confirm", {
            startTime: this.confirm.startTime.full,
            endTime: this.confirm.endTime.full,
            dayjs: dayjs
        }))
    }

    cloneDate(from, target) {
        $.extend(true, target, from)
        target.full = this.clone(from.full);
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

    _rendScroll(type, Y, isinit) {
        if (this[type + 'scroll']) {
            this[type + 'scroll'].destroy();
            this[type + 'scroll'] = null;
        }
        // this[type + 'scroll'] = new IScroll(document.querySelector('.' + type + '-container'), {

        // });
        this[type + 'scroll'] = new IScroll('.' + type + '-container', scrollOption);
        this[type + 'scroll'].refresh();
        this[type + 'scroll'].goToPage(0, Y || 0, isinit ? 0 : 500)
        this[type + 'scroll'].on('scrollEnd', e => {
            if(this[type + 'scroll'].currentPage.pageY>this[type + 'scroll'].pages[0].length-4){
                return;
            }
            let cur = this[type + 'Container'].querySelectorAll('li')[this[type + 'scroll'].currentPage.pageY + 2].getAttribute('data-num')
            this[this.currentType][type] = cur;
            this.rendScrollList(type);
            this.refreshCurrentShow();
            this.trigger('scrollEnd', {scroll: this[type + 'scroll'], currentType: this.currentType})

        })
    }

    refreshCurrentShow() {
        let time = dayjs();
        for (let i = 0; i < this.scrolllist.length; i++) {
            let f = this.scrolllist[i];
            if (f == 'month') {
                time = time[f](this[this.currentType][f] - 1)
            } else {
                time = time[f](this[this.currentType][f])
            }
        }
        this[this.currentType].full = time;
        this.currentContainer.innerHTML = this[this.currentType].full.format(this.format)
    }

    rendPicker() {
        this.initDateModal()
    }

    initScrollContainer() {
        let html = ''
        for (let i = 0; i < this.scrolllist.length; i++) {
            let f = this.scrolllist[i];
            html += `<div class="${f}-container">
            <ul>
            </ul>
            <div class="current-bg"></div>
        </div>`
        }
        return html;
    }

    initDateModal() {
        console.log(this.option.theme);
        let scrollContHtml = this.initScrollContainer();
        let dom = `<div class="xndatepicker-mobile-outer ${this.option.theme||''}" id="${this.id}"><div class="xndatepicker-mobile">
    <div class="xndatepicker-head">
      <a class="cancel-btn">${this.option.locale.cancel}</a>
      <span class="current-time"></span>
      <a class="confirm-btn">${this.option.locale.confirm}</a>
</div>
    <div class="shortcut-list">
    
</div>
    <div class="scroll-container">
        ${scrollContHtml}
    </div>
</div></div>`
        $(document.body).append(dom)
        this.scrollContainer = document.querySelector('#' + this.id);
        for (let i = 0; i < this.scrolllist.length; i++) {
            let f = this.scrolllist[i];
            this[f + 'Container'] = this.scrollContainer.querySelector('.' + f + '-container ul')
        }
        this.currentContainer = this.scrollContainer.querySelector('.current-time')
        this.geneShortList();
        this.rendScrollList();
    }

    geneShortList() {
        if(!this.option.showShortKeys){
            return;
        }
        var ul = '<ul>'
        for (let i = 0; i < this.option.shortList.length; i++) {
            ul += '<li>' + this.option.shortList[i].name + '</li>'
        }
        ul += '</ul>'
        this.shortcutcontainer = this.scrollContainer.querySelector('.shortcut-list');
        this.scrollContainer.querySelector('.shortcut-list').innerHTML = ul;
        this['shortcut' + 'scroll'] = new IScroll('.' + 'shortcut-list', {
            scrollX: true, scrollY: false, mouseWheel: true,
            scrollbars: false,
            snap: 'li'
        });
    }

    rendScrollList(type) {
        for (let i = 0; i < this.scrolllist.length; i++) {
            let f = this.scrolllist[i];
            if (f != type) {
                this['rend' + f](true, f);
            }
        }

    }

    rendyear(isinit, type) {
        this._rendList(type, this.minDate[type], this.maxDate[type], this[this.currentType][type] || this.maxDate[type], this.option.locale.yearHeadSuffix, isinit)
    }

    rendweek(isinit, type) {
        let num = dayjs(this[this.currentType]['year'] || this.maxDate[type]).isoWeeksInYear()
        if (!isinit) {
            if (this[this.currentType][type] > num) {
                this[this.currentType][type] = num;
            }
        }
        (this._rendList(type, 1, num, this[this.currentType][type], this.option.locale.weekNum, isinit))
    }

    rendmonth(isinit, type) {
        let min = 1, max = 12;
        if (this[this.currentType]['year']) {
            if ((this.minDate['year'] == this[this.currentType]['year'])) {
                min = this.minDate[type]
                if (this[this.currentType][type] < min) {
                    this[this.currentType][type] = min
                }
            }
            if ((this.maxDate['year'] == this[this.currentType]['year'])) {
                max = this.maxDate[type]
                if (this[this.currentType][type] > max) {
                    this[this.currentType][type] = max
                }
            }
        } else {
            max = this.maxDate[type]
            if ((this.minDate['year'] == this.maxDate['year'])) {
                min = this.minDate[type]
            }
        }
        this._rendList(type, min, max, this[this.currentType][type] || max, this.option.locale.month, isinit)
    }

    rendhour(isinit, type) {
        this._rendList(type, 0, 23, this[this.currentType][type] || 0, this.option.locale.hourSuffix, isinit)
    }

    rendminute(isinit, type) {
        this._rendList(type, 0, 59, this[this.currentType][type] || 0, this.option.locale.minuteSuffix, isinit)
    }

    rendsecond(isinit, type) {
        this._rendList(type, 0, 59, this[this.currentType][type] || 0, this.option.locale.secondSuffix, isinit)
    }

    renddate(isinit, type) {
        let num = this._getDaysNum(this[this.currentType].full || this.maxDate.full)
        // if (!isinit) {
        //     if (this[this.currentType][type] < min) {
        //         this[this.currentType][type] = min
        //     }
        // }
        let min = 1, max = num;
        if (this[this.currentType].full) {
            if (this.minDate['year'] == this[this.currentType]['year'] && this.minDate['month'] == this[this.currentType]['month']) {
                min = this.minDate[type]
                if (this[this.currentType][type] < min) {
                    this[this.currentType][type] = min
                }
            }
            if (this.maxDate['year'] == this[this.currentType]['year'] && this.maxDate['month'] == this[this.currentType]['month']) {
                max = this.maxDate[type]
                if (this[this.currentType][type] > max) {
                    this[this.currentType][type] = max
                }
            }
        }
        (this._rendList(type, min, max, this[this.currentType][type] || this.maxDate[type], this.option.locale.dateSuffix, isinit))
    }

    _rendList(type, min, max, current, suffix, isinit) {
        let list = '<li></li><li></li>';
        for (let i = min; i <= max; i++) {
            let name=i;
            if(suffix && typeof suffix =='function'){
                name=suffix(i);
            }
            if(suffix && Array.isArray(suffix)){
                name=suffix[i-1];
            }
            if(suffix && typeof suffix=='string'){
                name=name+suffix;
            }
            list += `<li data-num="${i}">${name}</li>`
        }
        list += '<li></li><li></li>';
        this[type + 'Container'].innerHTML = list;
        let y = current - min;
        this._rendScroll(type, y, isinit)
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
    destroy() {
        this.removeTargetClick();
        // this.removeClickEvent();
        this.scrollContainer && ($(this.scrollContainer).remove());

    }
    resetDate(startTime,endTime){
        this.formatInitialDate(startTime,endTime);
        this.initInput()
        // this.confirm[this.currentType]
    }
}

window.XNDatepickerMobile = XNDatepickerMobile;
export default XNDatepickerMobile
