const express = require("express");
const app = express();
const PORT = 9999;
const fs = require("fs");
const logger = require("./middlewares/logger");
const productRoutes = require("./routes/product-routes");
const userRoutes = require("./routes/user-routes");
const postRoutes = require("./routes/post-route");

//serve json
app.use(express.json());

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
