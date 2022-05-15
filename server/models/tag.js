const { sequelize } = require(".");
const font_tag = require("./font_tag");

module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "Tag",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      charset: "utf8",
    }
  );
