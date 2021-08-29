class InvalidInput extends Error {
  constructor(input) {
    const message = `O campo ${input} está invalido`;
    super(message);
    this.name = "InvalidInput";
    this.id = 1;
  }
}

module.exports = InvalidInput;
