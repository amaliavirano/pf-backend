const { Router } = require("express");
const CartManager = require("../dao/managers/CartManager");

class CartRoutes {
  path = "/api";
  router = Router();
  cartManager = new CartManager('carrito.json');

  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.router.post(`/carts`, (req, res) => {
      try {
        const nuevoCarrito = this.cartManager.createCart();
        res.json({ ok: true, message: `Carrito creado`, carrito: nuevoCarrito });
      } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, error: 'Error al crear el carrito' });
      }
    });

    this.router.get(`/carts/:cId`, (req, res) => {
      const cId = req.params.cId;

      try {
        const carritoEncontrado = this.cartManager.getCartById(cId);

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

    this.router.post(`/carts/:cid/product/:pid`, (req, res) => {
      const carritoId = req.params.cid;
      const productoId = req.params.pid;

      try {
        this.cartManager.addProductToCart(carritoId, productoId);
        const carritoEncontrado = this.cartManager.getCartById(carritoId);

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
  }
}

module.exports = CartRoutes;