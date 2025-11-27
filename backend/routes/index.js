const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "API is working!" });
});

router.use("/auth", require("./auth"));

module.exports = router;
