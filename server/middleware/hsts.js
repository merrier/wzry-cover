var oneDay = 86400;

module.exports = function hsts(opts) {
  opts = opts || {};
  var maxAge = opts.maxAge != null ? opts.maxAge : oneDay * 365;
  var force = opts.force;
  var setIf = opts.setIf;

  var header = 'max-age=' + maxAge;
  if (opts.includeSubDomains || opts.includeSubdomains) {
    header += '; includeSubDomains';
  }
  if (opts.preload) {
    header += '; preload';
  }
  return function hsts(req, res, next) {
    var setHeader;
    if (setIf) {
      setHeader = setIf(req, res);
    } else {
      setHeader = force || req.secure;
    }

    if (setHeader) {
      res.set('Strict-Transport-Security', header);
    }
    next();
  };
};
