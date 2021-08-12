const router = require("express").Router();
const dao = require("./FornecedorDAO");

router.get("/", async (req, res) => {
  const result = await dao.findAll();
  res.json(result);
});

module.exports = router;
