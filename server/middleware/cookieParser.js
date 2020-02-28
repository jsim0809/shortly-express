const parseCookies = (req, res, next) => {

  if (!req.headers.Cookie) {
    // req.cookies =
  }


};

const findShortlyId = (string) => {
  let startIndex = 0;
  let keyStart = string.indexOf('=');

  if (keyStart === -1) {
    return null;
  } else {
    string.slice(keyStart, string.indexOf(';'));
  }

};


module.exports = parseCookies;