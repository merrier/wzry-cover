var rp = require('request-promise');

module.exports = function (body, cb) {

  const headers = {
    // 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Accept': 'image/jpeg',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'Cache-Control': 'no-cache',
    'Host': 'shp.qpic.cn',
    'Pragma': 'no-cache',
    'Proxy-Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': 1,
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36',
  };

  const options = {
    uri: body.uri,
    encoding: 'utf8',
    headers,
    resolveWithFullResponse: true,
  }

  rp(options).then((res) => {
    // console.log('res-------', res);
    await rp({
      url: imgSrc,
      resolveWithFullResponse: true,
      headers
    }).pipe(fs.createWriteStream(`${downloadPath}/${index}.jpg`));//下载
    cb(res);
  }).catch(err => {
    // console.log('err------', err);
    cb(err);
  });
}