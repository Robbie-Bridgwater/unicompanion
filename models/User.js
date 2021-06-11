const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not a valid email",
    },
  },
  password: {
    type: String,
    required: true,
    min: [6, "Must be at least 6 characters!"],
  },
  is_SuperUser: {
    // if email = a specific email then superuser is true
    // need a way to add an event to calendar
    type: Boolean,
    required: false,
  },
  sport: {
    type: Array,
    // enum: ['Football', 'Rugby', 'Lacrosse', 'Hockey'],
    required: false,
    default: [],
  },
  society: {
    type: Array,
    // enum: ['Film', 'Dance', 'Music', 'Drinking'],
    required: false,
    default: [],
  },
});

UserSchema.pre("save", function (next) {
  let user = this;

  if (!user.isModified("password")) return next();

  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) return next(err);

    user.password = hash;
    next();
  });
});

// UserSchema.pre('findOneAndUpdate', function () {
//   this._update.password = bcrypt.hashSync(this._update.password, 10)
// })

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  console.log("here!");
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
