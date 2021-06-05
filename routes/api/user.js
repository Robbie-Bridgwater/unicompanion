const router = require("express").Router();
const userController = require("../../controllers/userController");

router.route("/")
  // .get(userController.findAll)
  .post(userController.create);

router.route("/login")
  .post(userController.authenticate);

router.route("/account")
  .get(userController.session);

// router.route("/:id")
//   .get(userController.findById)
//   .put(userController.update)
//   .delete(userController.remove);

module.exports = router;