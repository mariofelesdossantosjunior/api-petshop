const TableModel = require("../routes/fornecedores/TableModelFornecedor");

TableModel.sync()
  .then(() => console.log("Tabela criada com sucesso!"))
  .catch(console.log);
