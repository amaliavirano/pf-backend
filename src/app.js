const express = require("express");
const cartsRoutes = require("./routes/carts.routes");
const productsRoutes = require("./routes/products.routes");
const handlebars = require("express-handlebars");
const path = require("path");
const viewsRoutes = require("./routes/views.routes");
const { Server } = require("socket.io");
const {ProductManager} = require("./index");

const app = express();
const PORT = 8800;
const API_PREFIX = "api";


const httpServer = app.listen(PORT, () => {
  console.log(`Servidor Express en funcionamiento en el puerto: ${PORT}`);
});
const io = new Server(httpServer);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", express.static(path.join(__dirname, "public")));

// Configura handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

// RUTAS DE CARRITOS
// /api/carts
app.use(`/${API_PREFIX}/carts`, cartsRoutes);

// RUTAS DE PRODUCTOS
// /api/products
app.use(`/${API_PREFIX}/products`, productsRoutes);

// RUTAS DE VISTAS
app.use("/", viewsRoutes);

const productManager = new ProductManager('productos.json');


io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado: ", socket.id)


 });


