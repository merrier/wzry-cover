/*
 * utils.js 提供方便的js函数
 */
import request from 'request-promise';
import { stringify } from 'query-string';
import { message } from 'antd';

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

    /**
     * 根据base64导出图片
     */
    exportDataToImage: function (data, filename) {
        let a = document.createElement('a');
        a.setAttribute('href', 'data:image/jpeg;base64,' + data);
        a.download = `${filename}.jpg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    },

    downloadImage: function(url, filename ) {
        var image = new Image();
        image.src = url + '?v=' + Math.random(); // 处理缓存
        image.crossOrigin = "";  // 支持跨域图片
        image.onload = function(){
            var canvas = document.createElement("canvas");
            canvas.width = image.width;
            canvas.height = image.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0, image.width, image.height);
            var dataURL = canvas.toDataURL("image/jpeg");  // 可选其他值 image/jpeg
            exportDataToImage(dataURL, filename);
        }
    },

    getImageBlob: function (url, cb) {
        var xhr = new XMLHttpRequest();
        xhr.open('get', url, true);
        xhr.responseType = 'blob';
        xhr.onload = function () {
            // if (this.status == 200) {
            //     // imgResponse = this.response;
            //     //这里面可以直接通过URL的api将其转换，然后赋值给img.src
            //     //也可以使用下面的preView方法将其转换成base64之后再赋值
            //     // img.src = URL.createObjectURL(this.response);
            //     cb (this.response);
            // }
            var reader = new FileReader();
            reader.onloadend = function() {
                callback(reader.result);
            }
            reader.readAsDataURL(xhr.response);
        };
        xhr.send();
    }
}

module.exports = utils;