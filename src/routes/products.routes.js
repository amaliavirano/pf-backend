const { Router } = require("express");
const {ProductManager} = require("../index");

const router = Router();
const productManager = new ProductManager('productos.json');

// GET /api/products/
router.get(`/`, (req, res) => {
  const allProducts = productManager.getProducts();
  res.json({ products: allProducts });
  
});
// GET /api/products/view

router.get(`/view`, (req, res) => {
  const allProducts = productManager.getProducts();
  // console.log('All Products:', allProducts);
   res.render("index", { products: allProducts });
});

// GET /api/products/:productId
router.get(`/:productId`, (req, res) => {
  const productId = parseInt(req.params.productId);
  const product = productManager.getProductById(productId);

  if (product) {
    res.json({ product });
  } else {
    res.status(404).json({ error: "Producto no encontrado" });
  }
});

// POST /api/products/
router.post(`/`, (req, res) => {
  const productData = req.body;

  if (!productData || Object.keys(productData).length === 0) {
    return res.status(400).json({ error: 'Se requieren datos del producto en el cuerpo de la solicitud.' });
  }

  try {
    productManager.addProduct(productData);
    res.json({ success: true, message: 'Producto agregado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar el producto' });
  }
});

// PUT /api/products/:productId
router.put(`/:productId`, (req, res) => {
  const productId = parseInt(req.params.productId);
  const updatedProductData = req.body;

  try {
    productManager.updateProduct(productId, updatedProductData);
    res.json({ success: true, message: 'Producto actualizado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
});

// DELETE /api/products/:productId
router.delete(`/:productId`, (req, res) => {
  const productId = parseInt(req.params.productId);

  try {
    productManager.deleteProduct(productId);
    res.json({ success: true, message: 'Producto eliminado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});

module.exports = router;