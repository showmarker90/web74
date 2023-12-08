const { AppError } = require("../error/AppError");
const {
  createUserService,
  findAllService,
  getTotalAgeService,
} = require("../services/user-service");

const createUser = async (req, res, next) => {
  try {
    const { username, password, age } = req.body;

    if (!username || !password || !age) {
      throw new AppError("username,age and password are required", 400);
    }

    const newUser = await createUserService(username, password, age);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};

const findAll = async (req, res, next) => {
  try {
    const { age } = req.query;
    const result = await findAllService({ age });

    res.json(result);
  } catch (err) {
    next(err);
  }
};

const getTotalAge = async (req, res, next) => {
  try {
    const result = await getTotalAgeService();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = { createUser, findAll, getTotalAge };
