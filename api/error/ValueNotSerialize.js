class ValueNotSerialize extends Error {
  constructor(contentType) {
    super(`O tipo de conteudo  ${contentType} não é suportado`);
    this.name = "ValueNotSerialize";
    this.id = 3;
  }
}

module.exports = ValueNotSerialize;
