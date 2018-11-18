var rp = require('request-promise');

module.exports = function (cb) {

  const options = {
    uri: 'http://pvp.qq.com/web201605/js/herolist.json',
    encoding: 'utf8',
  }

  rp(options).then((res) => {
    const json = JSON.parse(res);
    cb(json);
  }).catch(err => {
    cb(err);
  });
}