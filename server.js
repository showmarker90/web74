require("dotenv").config();

const express = require("express");
const { connectDB } = require("./src/config/db");
const { userRoutes } = require("./src/routes/user-route");
const app = express();
const PORT = process.env.PORT || 8000;

//middleware for json
app.use(express.json());

//route
app.use("/user", userRoutes);

//handle err
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send(err.message || "Something broke!");
});

connectDB()
  .then((res) => {
    console.log(res);
    app.listen(PORT, () => {
      console.log(`Server running up in port :${PORT}`);
    });
  })
  .catch((err) => {
    console.err(err);
  });
