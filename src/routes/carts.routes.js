const { Router } = require("express");
const { CartManager } = require("../index");

const router = Router();
const cartManager = new CartManager('carrito.json');


// POST /api/carts/
router.post(`/`, (req, res) => {
  try {
    const nuevoCarrito = cartManager.createCart();
    res.json({ ok: true, message: `Carrito creado`, carrito: nuevoCarrito });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: 'Error al crear el carrito' });
  }
});

// GET /api/carts/:cId
router.get(`/:cId`, (req, res) => {
  const cId = req.params.cId;

  try {
    const carritoEncontrado = cartManager.getCartById(cId);

    if (!carritoEncontrado) {
      return res.status(404).json({
        ok: false,
        message: `No existe un carrito con el ID ${cId}`,
      });
    }

    return res.json({ ok: true, message: `Carrito ID: ${cId}`, carrito: carritoEncontrado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: 'Error al obtener el carrito' });
  }
});

// POST /api/carts/:cid/product/:pid ejemplo: localhost:8800/api/carts/1706907632156-1/product/2
router.post(`/:cid/product/:pid`, (req, res) => {
  const carritoId = req.params.cid;
  const productoId = req.params.pid;

  try {
    cartManager.addProductToCart(carritoId, productoId);
    const carritoEncontrado = cartManager.getCartById(carritoId);

    res.json({
      ok: true,
      message: `Producto ${productoId} agregado al carrito ${carritoId}`,
      carrito: carritoEncontrado,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: 'Error al agregar el producto al carrito' });
  }
});

module.exports = router;