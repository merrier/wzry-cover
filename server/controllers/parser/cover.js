import rp from 'request-promise';
import request from 'request';

export default function (page, search, cb) {

  const options = {
    uri: 'http://apps.game.qq.com/cgi-bin/ams/module/ishow/V1.0/query/workList_inc.cgi',
    encoding: 'utf8',
    qs: {
      activityId: 2735,
      sVerifyCode: 'ABCD',
      sDataType: JSON,
      iListNum: 20,
      totalpage: 0,
      page: page || 0,
      iOrder: 0,
      iSortNumClose: 1,
      iAMSActivityId: 51991,
      _everyRead: true,
      iTypeId: 2,
      iFlowId: 267733,
      iActId: 2735,
      iModuleId: 2735,
      _: 1520825658971,
    },
    // json: true,
    // resolveWithFullResponse: true
  }

  function parseResponse (str) {
    if(str.length > 0){
      var obj = str.replace(';', '');
      var arr = obj.split('JSON_workList_inc=');
      return JSON.parse(arr[1]);
    }
    return {};
  }

  rp(options).then((res) => {

    const json = parseResponse(res);

    cb(json);
  }).catch(err => {
    cb(err);
  });
}