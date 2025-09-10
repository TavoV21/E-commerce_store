import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../db.js";
import { Cart } from "./Cart.js";

export const User = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  id_rol: {
    type: DataTypes.INTEGER,
  },
});

User.hasMany(Cart, {
  foreignKey: "id_user",
  sourceKey: "id",
});

Cart.belongsTo(User, {
  foreignKey: "id_user",
  targetId: "id",
});
