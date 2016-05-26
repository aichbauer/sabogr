var jwt = require('jsonwebtoken'),
    secret = 'yourSecretKey';

module.exports={

  issue: function(payload){
    return jwt.sign(payload, secret, {expiresIn: 10800});
  },

  verify: function(token, cb){
    return jwt.verify(token, secret, {}, cb);
  }


};
