const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyJwtMiddleware(req, res, next) {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json("Header mustbe provide token");
  }

  const fields = authorization.split(" ");

  if (fields.length !== 2) {
    return res.status(400).json("Method auth is not support");
  }

  const token = fields[1];

  const decoded = jwt.verify(token, process.env.SECRET_KEY_TOKEN);
  console.log("running1");

  if (decoded.username !== process.env.USERNAME) {
    console.log(decoded.username);
    console.log(process.env.USERNANE);

    return res.status(403);
  }
  console.log("running2");
  next();
}

module.exports = verifyJwtMiddleware;
