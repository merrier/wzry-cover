/*
 * utils.js 提供方便的js函数
 */

import { parse, stringify } from 'query-string';
import { message } from 'antd';

/**
 * [trim description] 去掉字符串前后空格
 * @return {String} 去掉前后空格之后的字符串
 */
String.prototype.trim = function () {
    let str = this.replace(/^\s\s*/, ''),
        ws = /\s/,
        i = str.length;
    while (ws.test(str.charAt(--i)));
    return str.slice(0, i + 1);
};

let utils = {
    requestFetch: function (url, isPost, body) {
        const options = { credentials: 'include' }
        if (isPost) {
            options.method = 'POST'
            options.headers = {
                'Content-Type': 'application/json',
            }
            options.body = JSON.stringify(body)
        } else if (body) {
            url += '?' + stringify(body)
        }

        return fetch(url, options)
            .then(res => res.json())
            .catch(err => {
                message.error('数据异常，请检查网络设置');
            })
    },
}

module.exports = utils;