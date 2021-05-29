const path = require("path");
const router = require("express").Router();
const calendarRoutes = require("./calendar.js");

router.use("/calendar", calendarRoutes);

// For anything else, render the html page CHANGE TO BUILD ON DEPLOY
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../../public/index.html"));
});

module.exports = router;