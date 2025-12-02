const express = require("express");
const router = express.Router();

router.use("/", require("./get-profile"));
router.use("/", require("./update-profile")); 
router.use("/", require("./delete-account"));

module.exports = router;
