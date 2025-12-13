const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "API is working!" });
});

router.use("/auth", require("./auth"));
router.use("/profile", require("./profile"));

router.use("/expenses", require("./expenses"));
router.use("/categories", require("./categories"));

router.use("/dashboard", require("./dashboard"));

module.exports = router;
