const ValueNotSerialize = require("./error/ValueNotSerialize");

class Serializer {
  json(data) {
    return JSON.stringify(data);
  }

  serialize(data) {
    if (this.contentType === "json/application") {
      return this.json(data);
    }
    throw ValueNotSerialize(this.contentType);
  }
}

module.exports = {
  Serializer: Serializer,
  formatsAccepts: ["application/json"],
};
