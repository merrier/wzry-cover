var express = require('express');
const asyncWrapper = require('../../middleware').middleware.asyncWrapper;

var parse = require('../parser/cover');
var cache = require('../cache');

function getHomeTableSource(req, res) {
    const query = req.query;
    const page = query.page;
    const SearchValue = query.SearchValue || '';
    const iOrder = query.iOrder || '';
    const iGender = query.iGender || '';
    const iRoleSex = query.iRoleSex || '';

    const cacheKey = `cover_${page}_${SearchValue}_${iOrder}_${iGender}_${iRoleSex}`;
    const timeout = 60 * 5; // 5 minutes.

    function getCover(callback) {
        parse(query, data => {
            callback(data);
        });
    }

    cache.getOrSet(cacheKey, timeout, getCover, function (data) {

        res.json(data);
    });
}


module.exports = {
    getRouter: function () {
        var router = express.Router();
        router
            .get('/', asyncWrapper(getHomeTableSource));
        return router;
    }
};