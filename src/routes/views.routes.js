const { Router } = require("express");
const { ProductManager } = require("../index");

const router = Router();
const productManager = new ProductManager('productos.json');


// GET 

router.get("/", (req, res) => {
    res.render("index", {})
})

// GET /products/

router.get(`/products`, (req, res) => {
    const allProducts = productManager.getProducts();
    // console.log('All Products:', allProducts);
    res.render("index", { products: allProducts });
});


router.get(`/realtimeproducts`, (req, res) => {
    res.render("realTimeProducts", {});
});

module.exports = router;

