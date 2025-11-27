require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

app.use("/", require("./routes"));

const port = 3005;
app.listen(port, () => {
  console.log(
    `   \x1b[32m➜\x1b[0m  Local:   \x1b[36mhttp://localhost:${port}\x1b[0m`
  );
});
