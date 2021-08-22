const router = require("express").Router();
const dao = require("./FornecedorDAO");
const Fornecedor = require("./Fornecedor");
const { response } = require("express");

router.get("/", async (request, response) => {
  const result = await dao.findAll();
  response.status(200).json(result);
});

router.get("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const fornecedor = new Fornecedor({ id: id });
    await fornecedor.findById();
    response.status(200).json(fornecedor);
  } catch (error) {
    response.status(404).send(
      JSON.stringify({
        mensagem: error.message,
      })
    );
  }
});

router.post("/", async (request, response) => {
  try {
    const values = request.body;
    const fornecedor = new Fornecedor(values);
    await fornecedor.create();
    response.status(201).json(fornecedor);
  } catch (error) {
    response.status(400).send(
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
    response.status(204).end();
  } catch (error) {
    response.status(400).send(
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
    response.status(204).end();
  } catch (error) {
    response.status(404).send(
      JSON.stringify({
        mensagem: error.message,
      })
    );
  }
});

module.exports = router;
