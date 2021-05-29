const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CalendarSchema = new Schema({
  id: { 
    type: String, 
    required: true 
  },
  occasion: { 
    type: String, 
    required: true 
  },
  is_restricted: { 
    type: Boolean, 
    required: true 
  },
  for_date: { 
    type: Date, 
    required: true 
  },
  color: { type: String, 
    required: false 
  }

});

const Calendar = mongoose.model("Calendar", CalendarSchema);

module.exports = Calendar;