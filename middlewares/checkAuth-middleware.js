function checkAuthMiddleware(req, res, next) {
  const query = req.query;

  if (query.isLoggin) {
    next();
  } else {
    res.status(401).json("Must be loggin");
  }
}

module.exports = checkAuthMiddleware;
