const Calendar = require("../models/Calendar.js");

module.exports = {
  findAll: function (req, res) {
    Calendar.find(req.query)
      .then((dbCalendar) => res.json(dbCalendar))
      .catch((err) => res.status(422).json(err));
  },

  findById: function (req, res) {
    Calendar.findById(req.params.id)
      .then((dbCalendar) => res.json(dbCalendar))
      .catch((err) => res.status(422).json(err));
  },

  create: function (req, res) {
    Calendar.create(req.body)
      .then((dbCalendar) => res.json(dbCalendar))
      .catch((err) => res.status(422).json(err));
  },

  update: function (req, res) {
    Calendar.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbCalendar) => res.json(dbCalendar))
      .catch((err) => res.status(422).json(err));
  },

  remove: function (req, res) {
    Calendar.findById(req.params.id)
      .then((dbCalendar) => dbCalendar.remove())
      .then((dbCalendar) => res.json(dbCalendar))
      .catch((err) => res.status(422).json(err));
  },
};
