const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) =>
sequelize.define(
    "Font",
    {
        name:{
            type: DataTypes.STRING(32),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(120),
            allowNull: true,
        }

    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);

