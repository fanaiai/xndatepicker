//! xndatepicker.js
//! 仙女座日期选择器
//! version : 1.2.6
//! authors : 范媛媛
//! create date:2021/01/01
//! update date:2021/01/05 V1.0.0
//! update date:2021/01/28 V1.1.0
//! update date:2021/02/01 V1.2.0
//! update date:2021/02/03 V1.2.1 修复bug
//! update date:2021/02/04 V1.2.2 修复bug
//! update date:2021/03/11 V1.2.3 修复bug
//! update date:2021/03/26 V1.2.5 增加主题
//! update date:2021/06/18 V1.2.6 修改bug，起始日期和结束日期一样不能确定
//! update date:2021/11/11 V2.0.0 增加手机端支持
// https://github.com/fanaiai/xndatepicker
import XNDatepickerMobile from './xndatepickermobile.js'
import XNDatepickerPc from './xndatepickerpc.js'

class XNDatepicker{
    constructor(targetDom, options, onConfirm){
        if(options.isMobile){
            return new XNDatepickerMobile(targetDom, options, onConfirm)
        }
        else{
            return new XNDatepickerPc(targetDom, options, onConfirm)
        }
    }

}
window.XNDatepicker=XNDatepicker;
export default XNDatepicker
