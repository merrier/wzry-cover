/*
 * utils.js 提供方便的js函数，与业务相关
 */

/**
 * [trim description] 去掉字符串前后空格
 * @return {String} 去掉前后空格之后的字符串
 */
String.prototype.trim = function() {
    let str = this.replace(/^\s\s*/, ''),
        ws = /\s/,
        i = str.length;
    while (ws.test(str.charAt(--i)));
    return str.slice(0, i + 1);
};

/**
 * [request description] url中query解析
 * @param paras {Null} 参数可以为空，此时返回请求参数Map本身
 *              {String} 参数可以为请求key，以便返回querystring中key对应的value
 * @return {Object/String}  根据参数不同，要返回不同的结果，object或者字符串
 */
function request(paras) {
    let url = location.search;
    let paraString = url.substring(1).split("&");
    let paraObj = {};
    for (let i = 0, len = paraString.length; i < len; i++) {
        let j = paraString[i];
        if (j) {
            paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
        }
    }

    if (!paras) return paraObj;
    let returnValue = paraObj[paras.toLowerCase()];
    return returnValue ? returnValue.trim() : "";
}

/**
 * [countFormat description] 格式化数字
 * @param count {Number} 需要进行格式化的数字
 * @return {Number/String} 未格式化的数字或者格式化后的字符串
 */
function countFormat(count) {
    count -= 0;
    if (count >= 10000) {
        count /= 10000;
        count = count.toFixed(1);
        if (count.indexOf('.0') !== -1) {
            count = count.replace('.0', '');
        }
        count += '万';
    }
    return count;
}

/**
 * [dateToString description] 获取字符串形式的年月日，使用数组的join方法返回连接起来的字符串
 * @param date {Date} 需要转换成字符串格式的日期
 * @return {String} 字符串格式的日期
 */
function dateToString(date) {
    return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("-");
}

/**
 * [stringToDate description] 使字符串形式的日期返回为Date型的日期
 * @param str {String} 需要转换成日期格式的字符串
 * @return {Date} 日期
 */
function stringToDate(str) {
    let strArr = str.split('-');
    return new Date(strArr[0], strArr[1] - 1, strArr[2]);
}

/**
 * [generateDaysArray description] 根据开始时间和结束时间，返回其间所有天组成的数组
 * @param start {String} 字符串格式的开始日期
 * @param end {String} 字符串格式的结束日期
 * @return {Array} 其间所有天组成的数组
 */
function generateDaysArray(start, end) {
    // 获取传入字符串形式参数的Date型日期
    let st = stringToDate(start);
    let et = stringToDate(end);

    let retArr = [];

    // 获取开始日期的年，月，日  
    let yyyy = st.getFullYear(),
        mm = st.getMonth(),
        dd = st.getDate();

    // 循环  
    while (st.getTime() !== et.getTime()) {
        // 使用dd++进行天数的自增
        st = new Date(yyyy, mm, dd++);

        retArr.push(dateToString(st));
    }

    return retArr;
}

/**
 * [debounce description] 函数防抖动
 * @param func {Function}   实际要执行的函数
 * @param delay {Number}  执行间隔，单位是毫秒（ms）
 * @param immediate {String}  是否第一次立即执行
 * @return {Function}  返回一个“防抖动”函数
 */
function debounce(func, delay, immediate) {
    let timer = null;
    return function () {
        let context = this;
        let args = arguments;
        if (timer) clearTimeout(timer);
        if (immediate) {
            //根据距离上次触发操作的时间是否到达delay来决定是否要现在执行函数
            let doNow = !timer;
            //每一次都重新设置timer，就是要保证每一次执行的至少delay秒后才可以执行
            timer = setTimeout(function () {
                timer = null;
            }, delay);
            //立即执行
            if (doNow) {
                func.apply(context, args);
            }
        } else {
            timer = setTimeout(function () {
                func.apply(context, args);
            }, delay);
        }
    }
}

/**
 * [throttle description] 函数节流
 * @param func {Function}   实际要执行的函数
 * @param threshhold {Number}  执行间隔，单位是毫秒（ms）
 * @param immediate {String}  是否第一次立即执行
 * @return {Function}  返回一个“节流”函数
 */
function throttle(func, threshhold, immediate) {
    // 记录是否可执行
    let isRun = true;
    // 定时器
    let timer;
    immediate = immediate || true;
    // 默认间隔为 200ms
    threshhold || (threshhold = 200);
    // 返回的函数，每过 threshhold 毫秒就执行一次 fn 函数
    return function () {
        // 保存函数调用时的上下文和参数，传递给 fn
        let context = this;
        let args = arguments;
        //第一次执行
        if(type && 'undefined' === typeof timer){
            func()
        }
        if(!isRun)return;
        isRun = false;
        //保证间隔时间内执行
        timer = setTimeout(function () {
            func.apply(context, args);
            isRun = true;
        }, threshhold);
    }
}

let utils = {
    request,
    countFormat,
    generateDaysArray,
    debounce,
    throttle,
};

module.exports = utils;