const dao = require("./TableModelFornecedor");

module.exports = {
  findAll() {
    return dao.findAll();
  },

  insert(fornecedor) {
    return dao.create(fornecedor);
  },

  findById(id) {
    return dao.findByPk(id);
  },

  update(id, values) {
    return dao.update(values, {
      where: {
        id: id,
      },
    });
  },
};
