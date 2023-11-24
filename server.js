const express = require("express");
const app = express();
const PORT = 9999;
const productRoutes = require("./routes/product-routes");

//serve json
app.use(express.json());

//routes

//route-home
app.get("/", (req, res) => {
  res.status(400).send("lastName and firstName are required");
});

//route-product
//prefix
app.use("/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server running up in port :${PORT}`);
});
