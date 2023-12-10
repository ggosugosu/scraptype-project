export default (sequelize, DataTypes) =>
  sequelize.define(
    'Auth',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      token: {
        type: DataTypes.STRING(60),
      },
      expired_at: {
        type: DataTypes.STRING(30),
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      charset: 'utf8',
    }
  );
