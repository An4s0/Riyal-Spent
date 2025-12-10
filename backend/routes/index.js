const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "API is working!" });
});

router.use("/auth", require("./auth"));
router.use("/profile", require("./profile"));

router.use("/", require("./expenses"));      
router.use("/", require("./categories"));   

module.exports = router;
