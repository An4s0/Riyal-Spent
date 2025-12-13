const { DatabaseSync } = require("node:sqlite");
const path = require("path");

module.exports = function openDb() {
  return new DatabaseSync(
    path.join(__dirname, "../riyal-spent.db")
  );
};
