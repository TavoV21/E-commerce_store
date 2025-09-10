import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import { User } from "./Users.js";

export const Rol = sequelize.define(
  "rol",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    tableName: "rol",
    freezeTableName: true,
  }
);

Rol.hasMany(User, {
  foreignKey: "id_rol",
  sourceKey: "id",
});

User.belongsTo(Rol, {
  foreignKey: "id_rol",
  targetId: "id",
});

Rol.createDefaultData = async () => {
  const roles = await Rol.findAll();
  if (roles.length === 0) {
    await Rol.bulkCreate([
      { id: 1, name: "admin" },
      { id: 2, name: "user" },
    ]);
  }
};
