const { Router } = require("express");
const ProductManager = require("../dao/managers/ProductManager");
const ProductManagerDB= require("../dao/managers/ProductManagerDB");
const productsData = require("../init-data/products-data");
const productModel= require ("../dao/models/productModel")

class ProductRoutes {
  path = "/api";
  router = Router();
  productManager = new ProductManager('productos.json');
  ProductManagerDB= new ProductManagerDB();

  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.router.get(`/products`, (req, res) => {
      const allProducts = this.productManager.getProducts();
      res.json({ products: allProducts });
      console.log(products)
    });

    this.router.get(`/insertion`, async (req, res) => {
      try {
        const products = await productModel.insertMany(productsData);
        

        return res.json({
          message: "Productos insertados exitosamente",
          productsInserted: products,
        });
      } catch (error) {
        console.log(
          "🚀 ~ file: products.routes.js:23 ~ ProductsRoutes ~ this.router.get ~ error:",
          error
        );
        res.status(500).json({ error: 'Error al insertar productos' });
      }
    });

    this.router.get(``, async (req, res) => {
      try {
        const products = await this.ProductManagerDB.getAllProducts();

        return res
          .status(200)
          .json({ ok: true, message: `getAllProducts`, products });
      } catch (error) {
        console.log(
          "🚀 ~ file: products.routes.js:42 ~ ProductsRoutes ~ this.router.get ~ error:",
          error
        );
        res.status(500).json({ error: 'Error al obtener productos' });
      }
    });

    this.router.get(`/products/:productId`, (req, res) => {
      const productId = parseInt(req.params.productId);
      const product = this.productManager.getProductById(productId);

      if (product) {
        res.json({ product });
      } else {
        res.status(404).json({ error: "Producto no encontrado" });
      }
    });

    this.router.get(`/:productId`, async (req, res) => {
      try {
        const productId = req.params.productId;
        const product = await this.ProductManagerDB.getProductById(productId);

        if (!product) {
          return res.status(404).json({
            ok: true,
            message: `the product does not exist`,
          });
        }

        return res
          .status(200)
          .json({ ok: true, message: `getProductById`, product });
      } catch (error) {
        console.log(
          "🚀 ~ file: products.routes.js:59 ~ ProductsRoutes ~ this.router.get ~ error:",
          error
        );
        return res.status(500).json({
          ok: false,
          message: `something WRONG!!!`,
          error: error.message,
        });
      }
    });
    
    this.router.post(`/`, (req, res) => {
      const productData = req.body;

      if (!productData || Object.keys(productData).length === 0) {
        return res.status(400).json({ error: 'Se requieren datos del producto en el cuerpo de la solicitud.' });
      }

      try {
        this.productManager.addProduct(productData);
        res.json({ success: true, message: 'Producto agregado con éxito' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al agregar el producto' });
      }
    });

    this.router.post(`/`, (req, res) => {
      const productData = req.body;

      if (!productData || Object.keys(productData).length === 0) {
        return res.status(400).json({ error: 'Se requieren datos del producto en el cuerpo de la solicitud.' });
      }

      try {
        this.productManager.addProduct(productData);
        res.json({ success: true, message: 'Producto agregado con éxito' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al agregar el producto' });
      }
    });
    this.router.post(`/insertionP`, async (req, res) => {
      try {
        const ProductBody = req.body;

        const newProduct = await this.ProductManagerDB.createProduct(ProductBody);
        if (!newProduct) {
          return res.json({
            message: `the product with code ${ProductBody.code} is already register`,
          });
        }

        return res.json({
          message: `product created successfully`,
          product: newProduct,
        });
      } catch (error) {
        console.log(
          "🚀 ~ file: products.routes.js:79 ~ ProductsRoutes ~ this.router.post ~ error:",
          error
        );
        return res.status(500).json({ ok: false, message: error.message });
      }
    });

    this.router.put(`/:productId`, (req, res) => {
      const productId = parseInt(req.params.productId);
      const updatedProductData = req.body;

      try {
        this.productManager.updateProduct(productId, updatedProductData);
        res.json({ success: true, message: 'Producto actualizado con éxito' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el producto' });
      }
    });

    this.router.delete(`/:productId`, (req, res) => {
      const productId = parseInt(req.params.productId);

      try {
        this.productManager.deleteProduct(productId);
        res.json({ success: true, message: 'Producto eliminado con éxito' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el producto' });
      }
    });
  }
}

module.exports = ProductRoutes;