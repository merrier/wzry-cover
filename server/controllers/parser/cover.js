import rp from 'request-promise';
import request from 'request';

export default function (query, cb) {

  const options = {
    uri: 'http://apps.game.qq.com/cgi-bin/ams/module/ishow/V1.0/query/workList_inc.cgi',
    encoding: 'utf8',
    qs: {
      activityId: 2735,
      sVerifyCode: 'ABCD',
      sDataType: JSON,
      iListNum: 20,
      totalpage: 0,
      page: query.page || 0,
      iPageYype: 2, // 1:普通分页 2:十页分页模式
      iOrder: 0, // 排序方式 0:时间倒序 1:人气倒序 11:下载数排序
      // iGender: 0, // 性别 1:男 2:女
      // iRoleSex: 0, // 性别 1:男 2:女
      iSortNumClose: 1,
      iAMSActivityId: 51991, // AMS活动号
      _everyRead: true,
      iTypeId: 2,
      iFlowId: 267733,
      iActId: 2735,
      iModuleId: 2735,
    },
  }

  function decodeObject (obj) {
    for(var key in obj) {
      obj[key] = decodeURIComponent(obj[key]);
    }
  }

  function parseResponse (str) {
    if(str.length > 0){
      var obj = str.replace(';', '');
      var arr = obj.split('JSON_workList_inc=');
      let json = JSON.parse(arr[1]);
      if (json.List && json.List.length > 0) {
        json.List.map(item => {
          return decodeObject(item);
        })
      }
      return json;
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