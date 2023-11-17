const express = require("express");
const app = express();
const { logger } = require("./utils");
const path = require("path");

//static file

app.use(express.static("public"));

//json

app.use(express.json());

const p = {
  firstName: "Tom",
  lastName: "Halland",
  address: "Hn",
};

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/products", (req, res) => {
  logger(req);

  res.json(p);
});

//create post

app.post("/posts", (req, res) => {
  logger(req);
  res.status(400).json({ message: "password is required" });
});

//delete post

app.delete("/post", (req, res) => {
  logger(req);
  res.json("delete post");
});

app.listen(5173, () => {
  console.log("server start in port 5173");
});
