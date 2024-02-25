const express = require("express");
const handlebars = require("express-handlebars");
const { Server } = require("socket.io");
const http = require("http");
const displayRoutes = require("express-routemap");
const { mongoDBconnection } = require("./db/mongo.config");
const path = require("path");
const ViewRoutes = require("./routes/views.routes");
const ProductManager=require("./dao/managers/ProductManager")

const API_PREFIX = "api";

class App {
  constructor(routes) {
    this.app = express();
    this.port = 8800;

    this.connectToDataBase();
    this.initilizeMiddlewares();
    this.initializeRoutes(routes);
    this.initHandlerbars();

    this.server = http.createServer(this.app);


    const io = new Server(this.server);
    io.on("connection", (socket) => {
      console.log("Nuevo cliente conectado: ", socket.id);
      const productManager = new ProductManager('productos.json');

      socket.emit("updateProducts", productManager.getProducts());
      console.log(productManager);

      socket.on("productAction", ({ name, action }) => {
        if (action === "add") {
          productManager.addProduct({ title: name });
        } else if (action === "delete") {
          const product = productManager.getProductByName(name);

          if (product) {
            productManager.deleteProduct(product.id);
          } else {
            console.log("Producto no encontrado");
          }
        }
      });
    });
  }

  getServer() {
    return this.app;
  }

  closeServer() {
    this.server = this.app.listen(this.port, () => { });
  }

  async connectToDataBase() {
    await mongoDBconnection();
  }


  initializeRoutes(routes) {
    routes.forEach((route) => {
      if (route instanceof ViewRoutes) {

        this.app.use(route.router);
      } else {

        this.app.use(`/${API_PREFIX}`, route.router);
      }
    });
  }


  initilizeMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use("/", express.static(path.join(__dirname, "public")));
  }

  initHandlerbars() {
    this.app.engine("handlebars", handlebars.engine());
    this.app.set("views", __dirname + "/views");
    this.app.set("view engine", "handlebars");
  }


  listen() {
    this.server.listen(this.port, () => {
      displayRoutes(this.app);
      console.log(`=================================`);
      console.log(`==== PORT: ${this.port}`);
      console.log(`=================================`);
    });
  }
}

module.exports = App;
