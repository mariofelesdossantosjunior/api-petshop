const dao = require("./FornecedorDAO");

class Fornecedor {
  constructor({
    id,
    empresa,
    email,
    categoria,
    dataCriacao,
    dataAtualizacao,
    versao,
  }) {
    this.id = id;
    this.empresa = empresa;
    this.email = email;
    this.categoria = categoria;
    this.dataCriacao = dataCriacao;
    this.dataAtualizacao = dataAtualizacao;
    this.versao = versao;
  }

  async create() {
    this.validate();
    const result = await dao.insert({
      empresa: this.empresa,
      email: this.email,
      categoria: this.categoria,
    });

    this.id = result.id;
    this.dataCriacao = result.dataCriacao;
    this.dataAtualizacao = result.dataAtualizacao;
    this.versao = result.versao;
  }

  async findById() {
    const result = await dao.findById(this.id);
    this.id = result.id;
    this.empresa = result.empresa;
    this.email = result.email;
    this.categoria = result.categoria;
    this.dataCriacao = result.dataCriacao;
    this.dataAtualizacao = result.dataAtualizacao;
    this.versao = result.versao;
  }

  async update() {
    await dao.findById(this.id);
    const inputs = ["empresa", "email", "categoria"];
    const data = {};

    inputs.forEach((input) => {
      const value = this[input];
      if (typeof value === "string" && value.length > 0) {
        data[input] = value;
      }
    });

    if (Object.keys(data).length === 0) {
      throw new Error("Não foram fornecidos dados para atualizar");
    }

    await dao.update(this.id, data);
  }

  async delete() {
    await dao.delete(this.id);
  }

  validate() {
    const inputs = ["empresa", "email", "categoria"];

    inputs.forEach((item) => {
      const value = this[item];

      if (typeof value !== "string" || value.length === 0) {
        throw new Error(`O campo ${item} está inválido`);
      }
    });
  }
}

module.exports = Fornecedor;
