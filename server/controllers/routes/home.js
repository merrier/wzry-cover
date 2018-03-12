var express = require('express');
const asyncWrapper = require('../../middleware').middleware.asyncWrapper;

function getHomeSelectionList(req, res) {
    res.json({
        data: [
            {
                type: 'tags',
                text: '平台',
                dataIndex: 'platform',
                options: ['不限', '今日头条', '优酷', '腾讯视频', '爱奇艺', 'Bilibili', '秒拍'],
            }, {
                type: 'cascade',
                text: '分类',
                dataIndex: 'category',
                options: [{
                    value: '不限',
                    label: '不限',
                }, {
                    value: '体育',
                    label: '体育',
                }, {
                    value: '搞笑',
                    label: '搞笑',
                    children: [{
                        value: '哈哈',
                        label: '哈哈',
                    }, {
                        value: '啦啦',
                        label: '啦啦',
                    }],
                }, {
                    value: '娱乐',
                    label: '娱乐',
                }, {
                    value: '生活',
                    label: '生活',
                }],
            }, {
                type: 'tags',
                text: '评级',
                dataIndex: 'grade',
                options: ['不限', '1级', '2级', '3级', '4级', '5级'],
            }, {
                type: 'radio',
                text: '关联状态',
                dataIndex: 'status',
                options: ['不限', '无关联', '有关联', '人工关联'],
            }, {
                type: 'radio',
                text: '负责人',
                dataIndex: 'director',
                options: ['不限', '王小雪', '陈涛', '繁华', '王聪', '吴亦凡'],
            },
        ],
        message: 'success'
    });
}

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
    res.json({
        data: tableSource,
        message: 'success'
    });
}


module.exports = {
    getRouter: function () {
        var router = express.Router();
        router
            .get('/selection', asyncWrapper(getHomeSelectionList))
            .get('/table', asyncWrapper(getHomeTableSource));
        return router;
    }
};
