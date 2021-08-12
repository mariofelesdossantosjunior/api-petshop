const dao = require("./TableModelFornecedor");

module.exports = {
  findAll() {
    return dao.findAll();
  },
};
