const { User } = require("../models/user-model");

const createUserService = async (username, password, age) => {
  const newUser = new User({ username, password, age });

  await newUser.save();

  return newUser;
};

const findAllService = async ({ age }) => {
  const filter = {
    age: {
      $gt: age || 0,
    },
  };
  const result = await User.find(filter);
  const total = await User.countDocuments(filter);
  return { total, result };
};

const getTotalAgeService = async () => {
  //match
  const match = {
    $match: {
      age: {
        $gt: 10,
      },
    },
  };

  const group = {
    $group: {
      _id: null,
      totalAge: {
        $sum: "$age",
      },
    },
  };

  //pipeline
  const pipeline = [match, group];

  const result = await User.aggregate(pipeline);

  return result;
};

module.exports = { createUserService, findAllService, getTotalAgeService };
