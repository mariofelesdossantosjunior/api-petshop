const ValueNotSerialize = require("./error/ValueNotSerialize");

class Serializer {
  json(data) {
    return JSON.stringify(data);
  }

  serialize(data) {
    if (this.contentType === "application/json") {
      return this.json(data);
    }
    throw new ValueNotSerialize(this.contentType);
  }
}

class SerializerFornecedor extends Serializer {
  constructor(contentType) {
    super();
    this.contentType = contentType;
  }
}

module.exports = {
  Serializer: Serializer,
  SerializerFornecedor: SerializerFornecedor,
  formatsAccepts: ["application/json"],
};
