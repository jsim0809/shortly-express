const parseCookies = (req, res, next) => {
  var key;
  var value;

  if (req.headers.cookie) {
    var allCookies = req.headers.cookie.split('; ');
    allCookies.forEach((cookie) => {
      var splitCookie = cookie.split('=');
      req.cookies[splitCookie[0]] = splitCookie[1];
    });
  }
  next();
};


module.exports = parseCookies;