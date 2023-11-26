export default (sequelize, DataTypes) =>
  sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      kakao_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(45),
      },
      email: {
        type: DataTypes.STRING(60),
      },
      role: {
        type: DataTypes.STRING(10),
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      charset: 'utf8',
    }
  );
