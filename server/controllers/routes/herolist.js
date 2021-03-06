var express = require('express');
const asyncWrapper = require('../../middleware').middleware.asyncWrapper;

var parse = require('../parser/herolist');
var cache = require('../cache');

function getHeroList(req, res) {

    const cacheKey = 'herolist';
    const timeout = 60 * 5; // 5 minutes.

    cache.getOrSet(cacheKey, timeout, getList, function (data) {
        res.json(data);
    });

    function getList(callback) {
        parse(data => {
            callback(data);
        });
    }
}

module.exports = {
    getRouter: function () {
        var router = express.Router();
        router
            .get('/', asyncWrapper(getHeroList));
        return router;
    }
};