const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) =>
sequelize.define(
    "Tag",
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        name:{
            type: DataTypes.STRING(10),
            allowNull: false,
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
        charset: "utf8"
    }
);

