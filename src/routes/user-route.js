const {
  createUser,
  findAll,
  getTotalAge,
} = require("../controllers/user-controller");

const userRoutes = require("express").Router();

userRoutes.post("", createUser);
userRoutes.get("", findAll);
userRoutes.get("/total-age", getTotalAge);

module.exports = { userRoutes };
