const { Router } = require("express");

const router = Router();

/* const cartsList = [];

router.get("/", (req, res) => {
  return res.json({
    ok: true,
    carts: cartsList,
  });
});

// GET /api/carts/:petId
router.get(`/:cartId`, (req, res) => {
  return res.json({
    ok: true,
  });
});

// POST /api/carts/
router.post(`/`, (req, res) => {
  const newcart = req.body;
    const lastId = cartsList.length > 0 ? cartsList[petsList.length - 1].id + 1 : 1;
  cartsList.push({ id: lastId, ...newcart});

  res.json({
    ok: true,
    message: `mascota a gregada exitosamente`,
    pet: newPet,
  });
});

// PUT/api/pets/:petId
router.put(`/:petId`, (req, res) => {});

// DELETE /api/pets/:petId
router.delete(`/:petId`, (req, res) => {});
 */
module.exports = router;