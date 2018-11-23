const express = require('express');
const path = require('path');
const serverRender = require('../render/src/render');
const utils = require('../utils');
const setupMiddleware = require('../middleware');
const APP_CONF = utils.conf.getAppConf();

const app = express();
app.disable('x-powered-by');
setupMiddleware(app);

const port = APP_CONF.env.PORT;

// var publicPath = path.resolve(__dirname, '../public');
// app.use('/public', express.static(publicPath, { maxAge: '10d' }));

const apiController = require('../controllers/routes');
app.use('/api', apiController.getRouter());

app.use('', function(req, res, next) {
  serverRender(req, res);
});

const server = app.listen(port, function(err) {
  if (err) {
    console.error(err);
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
});

function gracefullyShutdown(signal) {
  return function() {
    logger.error('[PROCESS ' + signal + '][PID]' + process.pid + '[MEMORY]' + process.memoryUsage().heapUsed);
    server.close(function() {
      console.log('Closed out remaining connections.');
      process.exit(0);
    });
    setTimeout(function() {
      console.error('Could not close connections in time, forcefully shutting down');
      logger.error('[PROCESS ' + signal + ' FORCE][PID]' + process.pid + '[MEMORY]' + process.memoryUsage().heapUsed);
      process.exit(1);
    }, 2.5 * 1000);
  };
}

process.on('SIGINT', gracefullyShutdown('SIGINT'));
process.on('SIGTERM', gracefullyShutdown('SIGTERM'));

process.on('uncaughtException', function(err) {
  setImmediate(function() {
    process.exit(1);
  });
});