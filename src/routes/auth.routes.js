const router = require("express").Router();
const c = require("../controllers/auth.controller");
const { protect } = require("../middlewares/auth.middleware");

router.post("/register", c.register);
router.post("/login", c.login);
router.post("/forgot-password", c.forgot);
router.put("/reset-password", c.reset);
router.get("/me", protect, c.me);
router.delete("/delete-account", protect, c.deleteAccount);

module.exports = router;
