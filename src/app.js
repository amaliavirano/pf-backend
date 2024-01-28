const express = require("express");
const cartsRoutes = require("./routes/carts.routes");
const productsRoutes = require("./routes/products.routes");

const app = express();
const PORT = 8800;
const API_PREFIX = "api";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`/static`, express.static(__dirname + "/public"));

// CARTS ROUTES
// /api/carts
app.use(`/${API_PREFIX}/carts`, cartsRoutes);

// PRODUCTS ROUTES
// /api/products
app.use(`/${API_PREFIX}/products`, productsRoutes);
 
app.listen(PORT, () => {
  console.log(`UP AND RUNNING ON PORT: ${PORT}`);
});