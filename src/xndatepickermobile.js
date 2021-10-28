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
let option={};
class XNDatepickerMobile {
    constructor(targetDom, options, onConfirm) {
        this.$targetDom = $(targetDom);
        option = $.extend(true, {}, defaultoption, options);
        this.id = this.getRandomString();
        let minDate=dayjs(option.minDate)
        let maxDate=dayjs(option.maxDate)
        this.minDate={
            full:minDate,
            year:minDate.format('YYYY'),
            month:minDate.format('M'),
            date:minDate.format('D'),
        }
        this.maxDate={
            full:maxDate,
            year:maxDate.format('YYYY'),
            month:maxDate.format('M'),
            date:maxDate.format('D'),
        }
        this.init();
    }

    init() {
        this.$setRem();
        this.rendPicker();
        this.rendScroll();
    }

    rendScroll(){
        let scrollOption={
            mouseWheel: true,
            scrollbars: false,
            snap: 'li'
        };

        let myScroll1 = new IScroll('.year-container',scrollOption);
        let myScroll2 = new IScroll('.month-container',scrollOption);
        let myScroll3 = new IScroll('.date-container',scrollOption);
        myScroll1.on('scrollEnd',e=>{
            // console.log(myScroll1);
        })
        myScroll1.goToPage(0,3)
    }
    rendPicker() {
        this.initDateModal()
    }

    initDateModal(){
        let yearList='';
        for(let i=1770;i<2022;i++){
            yearList+=`<li>${i}年</li>`
        }
        let monthList='';
        for(let i=1;i<13;i++){
            monthList+=`<li>${i}月</li>`
        }
        let dateList='';
        for(let i=1;i<31;i++){
            dateList+=`<li>${i}日</li>`
        }
        let dom=`<div class="xndatepicker-mobile" id="${this.id}">
    <div class="xndatepicker-head">
      <a>取消</a>
      <span>2020年11月12日</span>
      <a>确认</a>
</div>
    <div class="scroll-container">
        <div class="year-container">
            <ul>
                <li> </li>
                <li> </li>
                ${yearList}
                <li> </li>
                <li> </li>
            </ul>
            <div class="current-bg"></div>
        </div>
        <div class="month-container">
            <ul>
                <li> </li>
                <li> </li>
                ${monthList}
                <li> </li>
                <li> </li>
            </ul>
            <div class="current-bg"></div>
        </div>
        <div class="date-container">
            <ul>
                <li> </li>
                <li> </li>
                ${dateList}
                <li> </li>
                <li> </li>
            </ul>
            <div class="current-bg"></div>
        </div>
    </div>
</div>`
        $(document.body).append(dom)
        this.scrollContainer=document.querySelector('#'+this.id);
        this.yearContainer=this.scrollContainer.querySelector('.year-container ul')
        this.monthContainer=this.scrollContainer.querySelector('.month-container ul')
        this.dateContainer=this.scrollContainer.querySelector('.date-container ul')
        this.rendYearContainer((option.minDate));
    }
    rendYearContainer(){

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
            docEl.style.fontSize = 1 * (clientWidth / (width||320)) + 'px';
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
window.XNDatepickerMobile=XNDatepickerMobile;
export default XNDatepickerMobile
