const router = require("express").Router();
const c = require("../controllers/admin.controller");
const { protect, adminOnly } = require("../middlewares/auth.middleware");

router.get("/users", protect, adminOnly, c.getAllUsers);
router.delete("/users/:uuid", protect, adminOnly, c.deleteUser);
router.put("/users/:uuid", protect, adminOnly, c.updateUserRole);

module.exports = router;
