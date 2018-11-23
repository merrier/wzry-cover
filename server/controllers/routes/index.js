var express = require('express');
var coverSub = require('./cover');
var herolistSub = require('./herolist');
var imageSub = require('./image');

module.exports = {
    getRouter: function () {
        var router = express.Router();
        router
            .use('/cover', coverSub.getRouter())
            .use('/herolist', herolistSub.getRouter())
            .use('/image', imageSub.getRouter());
        return router;
    }
};