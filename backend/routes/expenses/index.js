const express = require("express");
const router = express.Router();

router.use("/", require("./get-all"));
router.use("/", require("./create"));
router.use("/", require("./get-one"));
router.use("/", require("./update"));
router.use("/", require("./delete"));

module.exports = router;
