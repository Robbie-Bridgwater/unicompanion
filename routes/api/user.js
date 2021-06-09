const router = require("express").Router();
const userController = require("../../controllers/userController");

router
  .route("/")
  // .get(userController.findAll)
  .post(userController.create);

router.route("/login").post(userController.authenticate);

router.route("/logout").get(userController.logout);

router.route("/account").get(userController.session);

router
  .route("/:id")
  .get(userController.findUserById)
  .put(userController.update)
  .post(userController.socials);
//   .delete(userController.remove);

module.exports = router;
