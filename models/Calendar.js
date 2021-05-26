const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const calendarSchema = new Schema({

});

const Calendar = mongoose.model("Calendar", calendarSchema);

module.exports = Calendar;