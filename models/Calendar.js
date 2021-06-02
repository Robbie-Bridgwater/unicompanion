const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CalendarSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    allDay: {
        type: Boolean,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    }
});

const Calendar = mongoose.model("Calendar", CalendarSchema);

module.exports = Calendar;