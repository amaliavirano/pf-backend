const { Router } = require("express");
const ProductManager = require("../dao/managers/ProductManager");

class ViewRoutes {
  path = "/";
  router = Router();
  productManager = new ProductManager('productos.json');

  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    // GET /
    this.router.get("/", (req, res) => {
      res.render("index", {});
    });

    
    // GET /products/
    this.router.get("/products", (req, res) => {
      const allProducts = this.productManager.getProducts();
      res.render("index", { products: allProducts });
    });

    // GET /realtimeproducts
    this.router.get("/realtimeproducts", (req, res) => {
      res.render("realTimeProducts", {});
    });
  }
}

module.exports = ViewRoutes;