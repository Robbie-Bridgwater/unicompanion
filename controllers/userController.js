const User = require("../models/User.js");

module.exports = {
  create: function(req, res) {
    User.create(req.body)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  authenticate: function(req, res) {
    User.findOne({ email: req.body.email, password: req.body.password }, function(err, user) {
      if(err) {
        console.log(err);
        return res.status(500).send();
      }

      if(!user) {
        return res.status(404).send('User not found');
      }

      req.session.user = user;
      return res.status(200).send('Successfully logged in');
    });

  },
  session: function(req, res) {
    if(!req.session.user) {
      return res.status(401).send();
    }

    return res.status(200).send(req.session.user);

  },
  logout: function(req, res) {
    req.session.destroy();
    return res.status(200).send('Successfully ended session');
  }
};