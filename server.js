const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/index.js");
const app = express();
const logger = require("morgan");
const session = require("express-session");

require("dotenv").config();

app.use(logger("dev"));

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//use sessions for tracking logins
app.use(
  session({
    secret: process.env.EXPR_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1800000,
    },
  })
);

// Using static path Public during development CHANGE TO BUILD ON DEPLOY
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(routes);

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/unicompanion",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
);

app.listen(PORT, () => console.log(`Server now listening on PORT ${PORT}!`));
