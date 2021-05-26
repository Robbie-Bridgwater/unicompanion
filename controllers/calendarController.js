const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.Calendar.find(req.query)
      .then(dbCalendar => res.json(dbCalendar))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Calendar.findById(req.params.id)
      .then(dbCalendar => res.json(dbCalendar))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Calendar.create(req.body)
      .then(dbCalendar => res.json(dbCalendar))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Calendar.findOneAndUpdate({ id: req.params.id }, req.body)
      .then(dbCalendar => res.json(dbCalendar))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Calendar.findById(req.params.id)
      .then(dbCalendar => dbCalendar.remove())
      .then(dbCalendar => res.json(dbCalendar))
      .catch(err => res.status(422).json(err));
  }
};