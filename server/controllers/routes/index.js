var express = require('express');
var homeSub = require('./home');
var coverSub = require('./cover');

module.exports = {
    getRouter: function () {
        var router = express.Router();
        router
            .use('/home', homeSub.getRouter())
            .use('/cover', coverSub.getRouter());
        return router;
    }
};
