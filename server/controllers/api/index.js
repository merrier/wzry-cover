var express = require('express');
var homeSub = require('./home');

module.exports = {
    getRouter: function () {
        var router = express.Router();
        router
            .use('/home', homeSub.getRouter());
        return router;
    }
};
