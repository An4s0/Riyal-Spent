require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/", require("./routes"));

const port = 3005;
app.listen(port, () => {
  console.log(
    `   \x1b[32m➜\x1b[0m  Local:   \x1b[36mhttp://localhost:${port}\x1b[0m`
  );
});