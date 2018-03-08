var ip_route = require('iproute').route;

const SIMPLE_IP_REGX = /[0-9]{1,}\.[0-9]{1,}\.[0-9]{1,}\.[0-9]{1,}$/;
const PRIVATE_IP_REGX = /^192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[01])\./;

function getIp(req) {
  var aliCdnRealIp = req.get('ali-cdn-real-ip');
  var realIp = '0.0.0.0';
  if (req.get('http-x-forwarded-for') || req.get('x-forwarded-for')) {
    var ips = req.get('http-x-forwarded-for') || req.get('x-forwarded-for');
    ips = ips.split(',');
    ips.some(function(ip, idx) {
      ip = ip.trim();
      if (SIMPLE_IP_REGX.test(ip) && !PRIVATE_IP_REGX.test(ip) && ip !== aliCdnRealIp) {
        realIp = ip;
        return true;
      } 
      return false;
    });
    return realIp;
  } else {
    return req.get('remote-addr') || '0.0.0.0';
  }
}

function getPort(req) {
  var port = (req.get('http-x-real-port') || 0) || (req.get('x-real-port') || 0);
  return port.toString();
}

function getFullIp(req) {
  if (req.get('http-x-forwarded-for') || req.get('x-forwarded-for')) {
    return req.get('http-x-forwarded-for') || req.get('x-forwarded-for');
  } else {
    return req.get('remote-addr') || '0.0.0.0';
  }
}

function getRouteDefaultGateWayIP(callback) {
  ip_route.show({}, function(err, routes) {
    if (err) {
      callback(err, '');
    } else {
      var ret = '';
      routes.forEach(function(r, idx) {
        if (r.to === 'default') {
          ret = r.via;
          return false;
        }
      });
      callback(null, ret);
    }
  });
}

module.exports = {
  getIp: getIp,
  getPort: getPort,
  getFullIp: getFullIp,
  getRouteDefaultGateWayIP: getRouteDefaultGateWayIP
};
