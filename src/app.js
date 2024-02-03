const express = require("express");
const cartsRoutes = require("./routes/carts.routes");
const productsRoutes = require("./routes/products.routes");
const handlebars= require("express-handlebars");
const path= require ("path");
const viewsRoutes = require("./routes/views.routes");


const app = express();
const PORT = 8800;
const API_PREFIX = "api";


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`/static`, express.static(__dirname + "/public"));

// config handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(`${__dirname}/views`));
app.set("view engine", "handlebars");

app.use(`/static`, express.static(__dirname + "/public"));

// CARTS ROUTES
// /api/carts
app.use(`/${API_PREFIX}/carts`, cartsRoutes);

// PRODUCTS ROUTES
// /api/products
app.use(`/${API_PREFIX}/products`, productsRoutes);

// VIEWS ROUTES
app.use("/", viewsRoutes);

// views handlebars engine
app.get("/saludar", (req, res) => {
  const randomUser = Math.ceil(Math.random() * users.length);
  const userRender = users[randomUser];

  res.render("index", { name: userRender.name });
});

 
app.listen(PORT, () => {
  console.log(`UP AND RUNNING ON PORT: ${PORT}`);
}); 