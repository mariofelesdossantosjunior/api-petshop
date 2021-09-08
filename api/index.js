const express = require("express");
const config = require("config");
const router = require("./routes/fornecedores/index");
const NotFound = require("./error/NotFound");
const InvalidInput = require("./error/InvalidInput");
const DataNotFound = require("./error/DataNotFound");
const ValueNotSerialize = require("./error/ValueNotSerialize");
const formatsAccepts = require("./Serializer").formatsAccepts;

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  let format = req.header("Accept");

  if (format === "*/*") {
    format = "application/json";
  }

  if (formatsAccepts.indexOf(format) === -1) {
    res.status(406).end();
    return;
  }

  res.setHeader("Content-Type", format);
  next();
});
app.use(express.urlencoded({ extended: true }));

app.use("/api/fornecedores", router);

// notFound
app.use((error, request, response, next) => {
  let status = 500;

  if (error instanceof NotFound) {
    status = 404;
  }

  if (error instanceof InvalidInput || error instanceof DataNotFound) {
    status = 400;
  }

  if (error instanceof ValueNotSerialize) {
    status = 406;
  }

  response.status(status).send(
    JSON.stringify({
      mensagem: error.message,
      id: error.id,
    })
  );
});

app.listen(config.get("api.port"), () => console.log("A API está funcionando"));
