const express = require("express");
const config = require("config");
const router = require("./routes/fornecedores/index");
const NotFound = require("./error/NotFound");
const InvalidInput = require("./error/InvalidInput");
const DataNotFound = require("./error/DataNotFound");

const app = express();
app.use(express.json());
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

  response.status(status).send(
    JSON.stringify({
      mensagem: error.message,
      id: error.id,
    })
  );
});

app.listen(config.get("api.port"), () => console.log("A API está funcionando"));
