var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var compression = require('compression');
var favicon = require('serve-favicon');
var serverRender = require('../../server/render/src/render');
var utils = require('../utils');
var setupMiddleware = require('../middleware');
var middleware = setupMiddleware.middleware;
var APP_CONF = utils.conf.getAppConf();

var app = express();
app.disable('x-powered-by');
setupMiddleware(app);

var port = APP_CONF.port;

var publicPath = path.resolve(__dirname, '../public');
app.use('/public', express.static(publicPath, { maxAge: '10d' }));

var apiController = require('../controllers/routes');
app.use('/api', apiController.getRouter());

app.use('', function(req, res, next) {
  serverRender(req, res);
});

// export default function(app) {
//   app.listen(port, function(err) {
//     if (err) {
//       console.error(err);
//     } else {
//       console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
//     }
//   });
// }

var server = app.listen(port, function(err) {
  if (err) {
    console.error(err);
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
});

export default function(app){};