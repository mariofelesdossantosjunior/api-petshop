const ValueNotSerialize = require("./error/ValueNotSerialize");
const jsonToXml = require("jsontoxml");

class Serializer {
  json(data) {
    return JSON.stringify(data);
  }

  xml(data) {
    let tag = this.tagSingular;

    if (Array.isArray(data)) {
      tag = this.tagPlural;
      data = data.map((item) => {
        return {
          [this.tagSingular]: item,
        };
      });
    }

    return jsonToXml({ [tag]: data });
  }

  serialize(data) {
    data = this.filter(data);

    if (this.contentType === "application/json") {
      return this.json(data);
    }

    if (this.contentType == "application/xml") {
      return this.xml(data);
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
  constructor(contentType, extras) {
    super();
    this.contentType = contentType;
    this.publicInput = ["id", "empresa", "categoria"].concat(extras || []);
    this.tagSingular = "fornecedor";
    this.tagPlural = "fornecedores";
  }
}

class SerializeError extends Serializer {
  constructor(contentType, extras) {
    super();
    this.contentType = contentType;
    this.publicInput = ["id", "mensagem"].concat(extras || []);
    this.tagSingular = "error";
    this.tagPlural = "erros";
  }
}

module.exports = {
  Serializer: Serializer,
  SerializerFornecedor: SerializerFornecedor,
  SerializeError: SerializeError,
  formatsAccepts: ["application/json", "application/xml"],
};
