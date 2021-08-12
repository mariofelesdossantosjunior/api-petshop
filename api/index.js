const express = require("express");
const config = require("config");
const router = require("./routes/fornecedores/index");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/fornecedores", router);

app.listen(config.get("api.port"), () => console.log("A API está funcionando"));
