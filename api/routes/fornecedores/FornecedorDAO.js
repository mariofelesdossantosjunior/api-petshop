const dao = require("./TableModelFornecedor");

module.exports = {
  findAll() {
    return dao.findAll();
  },

  insert(fornecedor) {
    return dao.create(fornecedor);
  },

  async findById(id) {
    const find = await dao.findByPk(id);
    if (!find) {
      throw new Error("Fornecedor não encontrado");
    }
    return find;
  },

  update(id, values) {
    return dao.update(values, {
      where: {
        id: id,
      },
    });
  },

  delete(id) {
    return dao.destroy({
      where: {
        id: id,
      },
    });
  },
};
