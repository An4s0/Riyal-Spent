const express = require("express");
const router = express.Router();

router.use("/", require("./get-dashboard"));
router.use("/", require("./get-expenses"));      // GET /expenses
router.use("/", require("./add-expense"));       // POST /expenses
router.use("/", require("./get-expense-details")); // GET /expenses/:id
router.use("/", require("./update-expense"));    // PUT /expenses/:id
router.use("/", require("./delete-expense"));    // DELETE /expenses/:id

module.exports = router;