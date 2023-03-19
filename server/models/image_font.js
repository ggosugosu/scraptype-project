module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'ImageFont',
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
      title: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      unit: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      detail_mobile: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      detail_pc: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      charset: 'utf8',
    }
  );
