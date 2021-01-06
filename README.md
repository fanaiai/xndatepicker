# 概要
此选择器比较了市面上各种不同的日期时间选择器，争取最大化的支持各种需要的功能，目前支持的选择器类型有：
+ 单日期选择
+ 单日期时间选择
+ 日期/日期时间区间选择
+ 单月选择
+ 月份区间选择
+ 单年度选择
+ 年度区间选择
+ 按周选择
+ 多日期选择

后续还将增加其他的类型和配置，敬请期待哦！

## 如果选择器不能满足您的使用需求，请提交issue，我将尽快对选择器进行更新。

# 选择器样式示例：
![avatar](https://raw.githubusercontent.com/fanaiai/xndatepicker/main/img/%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_16098368986650.png)
# 使用步骤
### 下载代码
### 引用js
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="moment.js"></script>
    <script type="text/javascript" src="xndatepicker.js"></script>
    
### 初始化选择器
    var date=new XNDatepicker(
    $("#date"),//日历容器，可以是input，或其他标签
    {
            type:'daterange',
            showWeek: true,//是否显示周几
                    placeholder:'请选择',
                    shortList: [],//快捷选项，不写使用默认快捷选项
                    locale:{
                        month:[
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
                        monthHead:[
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
                        week:['日','一','二','三','四','五','六'],
                        clear:'清空',
                        confirm:'确定',
                        yearHeadSuffix:'年'
                    },//显示信息
                    confirmFirst:true,//第一次就搜索
                    separator:' 到 ',//双日历模式下的链接符
                    showType:'modal',//显示样式
                    linkPanels:false,//双日历面板联动
                    showClear:true,//是否显示清除按钮
                    autoConfirm:true,//单日历模式，和周日历模式，是否自动确定
                    showShortKeys:true,//是否显示快捷选项
                    autoFillDate:true,//自动变更element里面的值，如果自动变更，则按照插件样式显示
                    firstDayOfWeek:7,//周起始日 1-7
                    theme:'default',//主题
                    multipleDates:[],//当为多选日期类型时的初始值
                    startTime:'',//初始开始时间
                    endTime:'',//初始结束时间
                    minDate:'',//最小时间
                    maxDate:'',//最大时间
        },
        function(data){ //选择日期后的回调函数
            console.log(data)
        },)
## 方法
+ 销毁实例 fcolorpicker.destroy()
## 示例代码请参考 src/index.html
## 后续功能点
+ 移动端的支持
+ 多主题的支持
