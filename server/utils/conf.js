var nodeEnv = process.env.NODE_ENV || 'development';
var appJSON = require('../app.json');

var start = false;

module.exports = {
  getAppConf: function(env) {
    env = env || nodeEnv || 'development';
    !start && console.log('Environment ===> ', env);
    start = true;
    return appJSON;
  }
};
