const { Sequelize } = require("sequelize");
const config = require("config");

const connection = new Sequelize(
  config.get("postgres.database"),
  config.get("postgres.user"),
  config.get("postgres.password"),
  {
    host: config.get("postgres.host"),
    dialect: "postgres",
  }
);

module.exports = connection;
