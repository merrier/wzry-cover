var compression = require('compression');
var favicon = require('serve-favicon');
var hsts = require('./hsts');
// var useragent = require('express-useragent');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var asyncWrapper = require('./async-wrapper');
var path = require('path');
var express = require('express');

var isProduction = process.env.NODE_ENV === 'production';
var isDeveloping = !isProduction;

var middleware = {
  hsts: hsts,
  asyncWrapper
};

function setupMiddleware(app) {
  if (isProduction) {
    app.use(compression());
  }

  app.use('/static', express.static(path.resolve(__dirname, '../../dist'), { maxAge: '10d' }));
  app.use(favicon(path.resolve(__dirname, '../public/favicon.ico')));
  app.set('views', path.resolve(__dirname, '../views'));
  app.set('view engine', 'ejs');
  app.use(cookieParser());
  app.use(bodyParser.json({ limit: '50mb' })); // for parsing application/json
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // for parsing application/x-www-form-urlencoded

  // app.use(useragent.express());

}

module.exports = setupMiddleware;
module.exports.middleware = middleware;
