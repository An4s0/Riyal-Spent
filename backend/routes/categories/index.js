const express = require("express");
const router = express.Router();

router.use("/", require("./get-categories"));
router.use("/", require("./add-category"));
router.use("/", require("./get-category-details"));
router.use("/", require("./update-category"));
router.use("/", require("./delete-category"));

module.exports = router;

