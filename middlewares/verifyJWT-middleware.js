const jwt = require("jsonwebtoken");

function verifyJWTMiddleware(req, res, next) {
  //check có token hay ko
  const authorization = req.headers.authorization;

  if (!authorization) {
    res.status(401).json("Header mustbe provide token");
    return;
  }

  //check xem có đúng fai user không
  const fields = authorization.split(" ");

  if (fields.length !== 2) {
    res.status(400).json("Only bear token is support");
    return;
  }
  const token = fields[1];

  try {
    //verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY_TOKEN);

    if (decoded.username !== process.env.USERNAME) {
      res.status(403);
      return;
    }

    next();
  } catch (err) {
    throw err;
  }
}

module.exports = verifyJWTMiddleware;
