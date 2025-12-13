const express = require("express");
const router = express.Router();

router.use("/", require("./get"));
router.use("/", require("./update"));
router.use("/", require("./delete"));

module.exports = router;
