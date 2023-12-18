require("dotenv").config();
const express = require("express");
const app = express();

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.json("ready");
});

app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});
