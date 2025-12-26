const router = require("express").Router();

router.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Country Explorer API running" });
});

module.exports = router;
