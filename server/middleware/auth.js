const models = require('../models');
const Promise = require('bluebird');
const hashUtils = require('../lib/hashUtils');

module.exports.createSession = (req, res, next) => {
  console.log('=======Seth=======', req.cookies.shortlyid === undefined);
  if (req.cookies.shortlyid === undefined) {
    models.Sessions.create()
      .then((okpacket) => {
        return models.Sessions.get({ id: okpacket.insertId });
      })
      .then((session) => {
        res.cookie('shortlyid', session.hash);
        console.log('=================Vinie', session);
        req.session = { session };
        console.log('=================Jeremy', req.session);

      });
  }


  next();
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

