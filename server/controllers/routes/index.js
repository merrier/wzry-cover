var express = require('express');
var coverSub = require('./cover');
var herolistSub = require('./herolist');

module.exports = {
    getRouter: function () {
        var router = express.Router();
        router
            .use('/cover', coverSub.getRouter())
            .use('/herolist', herolistSub.getRouter());
        return router;
    }
};
