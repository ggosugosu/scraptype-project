module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "Font",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      corporation: {
        type: DataTypes.STRING(25),
        allowNull: true,
      },
      isWebFont: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      charset: "utf8",
    }
  );
