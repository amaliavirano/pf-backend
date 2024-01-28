const { Router } = require("express");
const fs = require("fs");
const path = require("path");
const listaProductos = require("../productos.json");

const router = Router();

// GET /api/users/
router.get(`/`, (req, res) => {
  return res.json({
    ok: true,
    productos: listaProductos.productos,
  });
});

// GET /api/users/:userId
router.get(`/:productoId`, (req, res) => {
  const productoId = req.params.productoId;

  if (isNaN(productoId)) {
    return res.status(400).json({
      ok: true,
      message: `No existe un producto con el id ${productoId}`,
      queryParams: req.query,
    });
  }

  const producto = listaProductos.productos.find((p) => p.id === Number(productoId));

  if (!producto) {
    return res.json({
      ok: true,
      message: `No existe un producto con el id ${productoId}`,
      producto,
      queryParams: req.query,
    });
  }

  return res.json({ ok: true, message: `Producto id: ${productoId}`, producto });
});

// POST /api/products/
router.post(`/`, (req, res) => {
  const producto = req.body;
  console.log("🚀 ~ router.post ~ producto:", producto);

  const lastId = listaProductos.productos[listaProductos.productos.length - 1].id;
  const newId = lastId + 1;

  const newProducto = {
    id: newId,
    ...producto,
  };

  listaProductos.productos.push(newProducto);

  guardarProductos(listaProductos.productos);

  res.json({ ok: true, message: `Producto creado`, producto: newProducto });
});

// PUT /api/products/:productsId
router.put(`/:productoId`, (req, res) => {
  const productoId = req.params.productoId;
  const updatedProduct = req.body;

  const index = listaProductos.productos.findIndex((p) => p.id === Number(productoId));

  if (index === -1) {
    return res.status(404).json({
      ok: false,
      message: `No existe un producto con el id ${productoId}`,
    });
  }

  listaProductos.productos[index] = {
    ...listaProductos.productos[index],
    ...updatedProduct,
  };

  guardarProductos(listaProductos.productos);

  res.json({
    ok: true,
    message: `Producto actualizado con éxito`,
    producto: listaProductos.productos[index],
  });
});

// DELETE /api/products/:productsId
router.delete(`/:productoId`, (req, res) => {
  const productoId = req.params.productoId;

  const index = listaProductos.productos.findIndex((p) => p.id === Number(productoId));

  if (index === -1) {
    return res.status(404).json({
      ok: false,
      message: `No existe un producto con el id ${productoId}`,
    });
  }

  const deletedProduct = listaProductos.productos.splice(index, 1)[0];

  guardarProductos(listaProductos.productos);

  res.json({
    ok: true,
    message: `Producto eliminado con éxito`,
    producto: deletedProduct,
  });
});

// Función para guardar la lista de productos en el archivo productos.json
function guardarProductos(productos) {
  const filePath = path.join(__dirname, "../productos.json");

  const productosJSON = JSON.stringify({ productos }, null, 2);

  fs.writeFileSync(filePath, productosJSON, "utf8");
}

module.exports = router;
