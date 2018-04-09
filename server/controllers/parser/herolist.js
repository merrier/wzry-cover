import rp from 'request-promise';
import request from 'request';

export default function (cb) {

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