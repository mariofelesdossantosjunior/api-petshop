const router = require("express").Router();
const dao = require("./FornecedorDAO");
const Fornecedor = require("./Fornecedor");
const { response } = require("express");

router.get("/", async (request, response) => {
  const result = await dao.findAll();
  response.json(result);
});

router.get("/:id", async (request, response) => {
  const id = request.params.id;
  const fornecedor = new Fornecedor({ id: id });
  await fornecedor.findById(id);
  response.json(fornecedor);
});

router.post("/", async (request, response) => {
  try {
    const values = request.body;
    const fornecedor = new Fornecedor(values);
    await fornecedor.create();
    response.json(fornecedor);
  } catch (error) {
    response.send(
      JSON.stringify({
        mensagem: error.message,
      })
    );
  }
});

router.put("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const values = request.body;
    const data = Object.assign({}, values, { id: id });
    const fornecedor = new Fornecedor(data);
    await fornecedor.update();
    response.end();
  } catch (error) {
    response.send(
      JSON.stringify({
        mensagem: error.message,
      })
    );
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const fornecedor = new Fornecedor({ id: id });
    await fornecedor.findById();
    await fornecedor.delete();
    response.end();
  } catch (error) {
    response.send(
      JSON.stringify({
        mensagem: error.message,
      })
    );
  }
});

module.exports = router;
