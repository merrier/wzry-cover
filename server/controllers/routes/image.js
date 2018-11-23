var express = require('express');
const asyncWrapper = require('../../middleware').middleware.asyncWrapper;

var parse = require('../parser/image');
var cache = require('../cache');

function getImage(req, res) {

    const { uri } = req.body;
    const cacheKey = `image_${uri}`;
    const timeout = 60 * 5; // 5 minutes.

    function getImageData(callback) {
        parse(req.body, data => {
            callback(data);
        });
    }

    cache.getOrSet(cacheKey, timeout, getImageData, function (data) {
        res.json(data);
    });
}

module.exports = {
    getRouter: function () {
        var router = express.Router();
        router
            .post('/', asyncWrapper(getImage));
        return router;
    }
};