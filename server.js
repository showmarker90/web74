const express = require("express");
const app = express();
const PORT = 9999;
const fs = require("fs");
const logger = require("./middlewares/logger");
const productRoutes = require("./routes/product-routes");
const userRoutes = require("./routes/user-routes");
const postRoutes = require("./routes/post-route");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const sessionCookieMiddleware = require("./middlewares/sessionCookie-middleware");
const jwt = require("jsonwebtoken");
const verifyJwtMiddleware = require("./middlewares/verifyJWT-middleware");

require("dotenv").config();

//middleware for json

app.use(express.json());

const user = {
  firstName: "Elon",
  lastName: "Musk",
  address: "VN",
};

// route -> api/auth/login -> username,password
app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;

  //in correct
  if (username !== process.env.USERNAME || password !== process.env.PASSWORD) {
    return res.json("username and password are not correct");
  }

  const infoUser = {
    username: process.env.USERNAME,
    role: "user",
  };

  //create token and send to client
  const token = jwt.sign(infoUser, process.env.SECRET_KEY_TOKEN);

  res.json(token);
});

//verify jwt
app.use(verifyJwtMiddleware);

app.get("/api/me", (req, res) => {
  res.json(user);
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.use((err, req, res, next) => {
  // console.error(err.stack);
  res.status(500).send(err.message || "Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server running up in port :${PORT}`);
});
