const ValueNotSerialize = require("./error/ValueNotSerialize");

class Serializer {
  json(data) {
    return JSON.stringify(data);
  }

  serialize(data) {
    if (this.contentType === "application/json") {
      return this.json(this.filter(data));
    }
    throw new ValueNotSerialize(this.contentType);
  }

  filter(data) {
    if (Array.isArray(data)) {
      data = data.map((item) => this.filterObject(item));
    } else {
      data = this.filterObject(data);
    }

    return data;
  }

  filterObject(data) {
    const object = {};

    this.publicInput.forEach((item) => {
      if (data.hasOwnProperty(item)) {
        object[item] = data[item];
      }
    });

    return object;
  }
}

class SerializerFornecedor extends Serializer {
  constructor(contentType) {
    super();
    this.contentType = contentType;
    this.publicInput = ["id", "empresa", "categoria"];
  }
}

module.exports = {
  Serializer: Serializer,
  SerializerFornecedor: SerializerFornecedor,
  formatsAccepts: ["application/json"],
};
