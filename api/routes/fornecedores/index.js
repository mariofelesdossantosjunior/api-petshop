const router = require("express").Router();
const dao = require("./FornecedorDAO");
const Fornecedor = require("./Fornecedor");

router.get("/", async (req, res) => {
  const result = await dao.findAll();
  res.json(result);
});

router.post("/", async (req, res) => {
  const values = req.body;
  const fornecedor = new Fornecedor(values);
  await fornecedor.create();
  res.json(fornecedor);
});

module.exports = router;
