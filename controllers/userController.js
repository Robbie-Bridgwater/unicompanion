const User = require("../models/User.js");
const bcrypt = require("bcrypt");

module.exports = {
    findUserById: function(req, res) {
        console.log(req.params.id)
        console.log(req.session.user._id)
        if (req.params.id === req.session.user._id) {
            User.findById(req.params.id)
            .then(
                dbUser => res.json(dbUser)
                )
            .catch(err => res.status(422).json(err));
        } else {
            return res.status(401).send();
        }
        
        

            // if (!req.session.user) {
            //     return res.status(401).send();
            // }
    
            // return res.status(200).send(req.session.user);
    },

    create: function(req, res) {
        User.create(req.body)
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(422).json(err));
    },

   authenticate: function(req, res) {
    try {
      User.findOne({ email: req.body.email }, function(error, user) {
        if(!user) {
          return res.status(400).send({ message: "The username does not exist" });
        }
        
        bcrypt.compare(req.body.password, user.password, (error, match) => {
          if(match) {
            req.session.user = user;
            return res.status(200).send('Successfully logged in');
          }
                    
          return res.status(400).send({ message: "The password is invalid" });
        });

      });
    } catch (error) {
        res.status(500).send(error);
    }
  },

  session: function(req, res) {
    if (!req.session.user) {
      return res.status(401).send();
    }

    return res.status(200).send(req.session.user);
  },

  logout: function(req, res) {
    req.session.destroy();
    return res.status(200).send('Successfully ended session');
  },

  update: function(req, res) {
    User.findOneAndUpdate({ _id: req.params.id }, { password: req.body.password })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },  

    socials: function(req, res) {
        console.log(req.body);
        console.log('here');
        User.findOneAndUpdate({_id: req.params.id}, {sport: req.body.sport, society: req.body.society})
        .then(dbUser => res.json(dbUser))
        .catch(err => res.status(422).json(err));
    }
};