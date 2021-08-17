const dao = require("./TableModelFornecedor");

module.exports = {
  findAll() {
    return dao.findAll();
  },

  insert(fornecedor) {
    return dao.create(fornecedor);
  },
};
