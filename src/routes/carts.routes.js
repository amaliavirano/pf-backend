const { Router } = require("express");
const fs = require("fs");
const path = require("path");

const router = Router();
const filePath = path.join(__dirname, "../carrito.json");

// POST /api/carts/
router.post(`/`, (req, res) => {
  const nuevoCarrito = req.body;
  console.log("🚀 ~ router.post ~ carrito:", nuevoCarrito);

  const newId = generarIdCarrito();

  nuevoCarrito.id = newId;

  const carritos = leerCarritos();
  carritos.push(nuevoCarrito);

  guardarCarrito(carritos);

  res.json({ ok: true, message: `Carrito creado`, carrito: nuevoCarrito });
});

// GET /api/carts/:cId
router.get(`/:cId`, (req, res) => {
  const cId = req.params.cId;

  const carritos = leerCarritos();

  if (!carritos || !carritos.length) {
    return res.status(404).json({
      ok: false,
      message: `No hay carritos disponibles`,
    });
  }

  const carritoEncontrado = carritos.find((c) => c.id == cId);

  if (!carritoEncontrado) {
    return res.status(404).json({
      ok: false,
      message: `No existe un carrito con el ID ${cId}`,
    });
  }

  return res.json({ ok: true, message: `Carrito ID: ${cId}`, carrito: carritoEncontrado });
});

function generarIdCarrito() {
  return Math.random().toString(36).substring(2, 15);
}

function leerCarritos() {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data).carritos || [];
  } catch (error) {
    console.error("Error al leer el archivo:", error.message);
    return [];
  }
}

function guardarCarrito(carritos) {
  try {
    fs.writeFileSync(filePath, JSON.stringify({ carritos }, null, 2), 'utf8');
  } catch (error) {
    console.error("Error al escribir en el archivo:", error.message);
  }
}

// POST /api/carts/:cid/product/:pid
router.post(`/:cid/product/:pid`, (req, res) => {
  const carritoId = req.params.cid;
  const productoId = req.params.pid;

  const carritos = leerCarritos();

  const carritoEncontrado = carritos.find((c) => c.id == carritoId);

  if (!carritoEncontrado) {
    return res.status(404).json({
      ok: false,
      message: `No existe un carrito con el ID ${carritoId}`,
    });
  }

  const productoExistente = carritoEncontrado.products.find((p) => p.product == productoId);

  if (productoExistente) {
    productoExistente.quantity += 1;
  } else {
    carritoEncontrado.products.push({
      product: productoId,
      quantity: 1,
    });
  }

  guardarCarrito(carritos);

  res.json({
    ok: true,
    message: `Producto ${productoId} agregado al carrito ${carritoId}`,
    carrito: carritoEncontrado,
  });
});

module.exports = router;
