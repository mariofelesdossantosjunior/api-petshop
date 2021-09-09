const dao = require("./TableModelFornecedor");
const notFound = require("../../error/NotFound");
const NotFound = require("../../error/NotFound");

module.exports = {
  findAll() {
    return dao.findAll({ raw: true });
  },

  insert(fornecedor) {
    return dao.create(fornecedor);
  },

  async findById(id) {
    const find = await dao.findByPk(id);
    if (!find) {
      throw new NotFound();
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
