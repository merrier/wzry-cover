var express = require('express');
const asyncWrapper = require('../../middleware').middleware.asyncWrapper;

import parse from '../parser/cover';
import cache from '../cache';

function getHomeTableSource(req, res) {
    const query = req.query;
    console.log(query);

    const page = query.page;
    const search = query.search || '';

    const cacheKey = `cover_${page}_${search}`;
    const timeout = 60 * 5; // 5 minutes.

    cache.getOrSet(cacheKey, timeout, getCover, function (data) {

        res.json(data);
    });

    function getCover(callback) {
        parse(query, (data) => {
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