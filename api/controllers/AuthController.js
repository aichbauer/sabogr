/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  register: function (req, res) {

    var body = req.allParams();

    if (body.email && body.username && body.password) {

      User.create({username: body.username, email: body.email, password: body.password})
        .then(function (user) {
          return res.json(200, {user: user, token: JWTService.issue({id: user.id})});
        })
        .fail(function (err) {
          return res.negotiate(err);
        });

    } else {
      return res.json(400, {msg: 'Username, Email, Password are required!'});
    }

  },

  login: function (req, res) {

    var pw = req.param('password');
    var username = req.param('username');

    if (pw && username) {
      User.findOne({username: username})
        .then(function (user) {
          if (!user) {
            return res.json(400, {msg: 'username or password is not correct'});
          }
          else {
            User.comparePassword(pw, user, function (err, match) {
              if (err) {
                return res.negotiate(err);
              }
              else {
                if (match) {
                  return res.json(200, {user: user, token: JWTService.issue({id: user.id})});
                }
                else {
                  return res.json(400, {msg: 'username or password is not correct'});
                }
              }
            })
          }
        })
    }
  }

};

