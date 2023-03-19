module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'FontTag',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      font_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Font',
          key: 'id',
        },
      },
      tag_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Tag',
          key: 'id',
        },
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      charset: 'utf8',
    }
  );
