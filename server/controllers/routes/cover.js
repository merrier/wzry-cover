var express = require('express');
const asyncWrapper = require('../../middleware').middleware.asyncWrapper;

import parse from '../parser/cover';
import cache from '../cache';
import utils from '../utils';

const platformArray = ['今日头条', '优酷', '腾讯视频', '爱奇艺', 'Bilibili', '秒拍'];
const categoryArray = ['体育', '搞笑/哈哈', '搞笑/啦啦', '娱乐', '生活'];
const statusArray = ['有关联', '无关联', '人工关联'];
const directorArray = ['王小雪', '陈涛', '繁华', '王聪', '吴亦凡'];
const tableSource = [];

for (let i = 0; i < 100; i++) {
    tableSource.push({
        key: i,
        order: i < 10 ? '0' + i : i,
        name: `papi酱${i}`,
        url: `http://insight.bytedance.net/author/detail/${i}`,
        platform: platformArray[Math.floor(Math.random() * platformArray.length)],
        category: categoryArray[Math.floor(Math.random() * categoryArray.length)],
        grade: [Math.floor(Math.random() * 5)] + '级',
        status: statusArray[Math.floor(Math.random() * statusArray.length)],
        director: directorArray[Math.floor(Math.random() * directorArray.length)],
    });
}


function getHomeTableSource(req, res) {
    const query = req.query;
    console.log(query);

    const page = query.page;
    const search = query.search || '';

    const cacheKey = `cover_${page}_${search}`;
    const timeout = 60 * 5; // 5 minutes.

    cache.getOrSet(cacheKey, timeout, getCover, function (data) {

        res.json(data);

        // if (data.statusCode) {
        //     res.status(data.response.statusCode).send(data.response.statusMessage);
        // } else {
        //     const filtered = data;
        //     res.json({
        //         data: filtered,
        //         message: 'success'
        //     });
        // }
    });

    function getCover(callback) {
        parse(page, search, (data) => {
            callback(data);
        });
    }
}


module.exports = {
    getRouter: function () {
        var router = express.Router();
        router
            .get('/', asyncWrapper(getHomeTableSource));
        return router;
    }
};