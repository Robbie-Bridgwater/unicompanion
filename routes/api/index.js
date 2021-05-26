const path = require("path");
const router = require("express").Router();
// REQUIRE IN API ROUTES HERE

router.use("/", );


// For anything else, render the html page CHANGE TO BUILD ON DEPLOY
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../../client/public/index.html"));
});

module.exports = router;