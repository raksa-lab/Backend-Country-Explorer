const router = require("express").Router();
const controller = require("../controllers/user.controller");
const { protect, adminOnly } = require("../middlewares/auth.middleware");

router.get("/me", protect, controller.getMe);
router.get("/:uuid", protect, adminOnly, controller.getUserById);

module.exports = router;
