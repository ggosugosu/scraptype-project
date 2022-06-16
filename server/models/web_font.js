module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "WebFont",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      font_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      family: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      source: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      charset: "utf8",
    }
  );
