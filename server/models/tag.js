const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) =>
sequelize.define(
    "Tag",
    {
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

