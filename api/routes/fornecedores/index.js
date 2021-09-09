const router = require("express").Router();
const dao = require("./FornecedorDAO");
const Fornecedor = require("./Fornecedor");
const { response } = require("express");
const NotFound = require("../../error/NotFound");
const SerializerFornecedor = require("../../Serializer").SerializerFornecedor;

router.get("/", async (request, response) => {
  const result = await dao.findAll();

  response.status(200);

  const serializer = new SerializerFornecedor(
    response.getHeader("Content-Type")
  );

  response.send(serializer.serialize(result));
});

router.get("/:id", async (request, response, next) => {
  try {
    const id = request.params.id;
    const fornecedor = new Fornecedor({ id: id });
    await fornecedor.findById();
    response.status(200);

    const serializer = new SerializerFornecedor(
      response.getHeader("Content-Type"),
      ["email", "dataCriacao", "dataAtualizacao", "versao"]
    );

    response.send(serializer.serialize(fornecedor));
  } catch (error) {
    next(error);
  }
});

router.post("/", async (request, response, next) => {
  try {
    const values = request.body;
    const fornecedor = new Fornecedor(values);
    await fornecedor.create();

    response.status(201);

    const serializer = new SerializerFornecedor(
      response.getHeader("Content-Type")
    );

    response.send(serializer.serialize(fornecedor));
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (request, response, next) => {
  try {
    const id = request.params.id;
    const values = request.body;
    const data = Object.assign({}, values, { id: id });
    const fornecedor = new Fornecedor(data);
    await fornecedor.update();
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (request, response, next) => {
  try {
    const id = request.params.id;
    const fornecedor = new Fornecedor({ id: id });
    await fornecedor.findById();
    await fornecedor.delete();
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
