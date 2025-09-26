import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../db.js";
import { Cart } from "./Cart.js";
import { encrypt } from "../handle/handlebcrypt.js";

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

User.createDefaultData = async () => {
  const admin = await User.findOne({ where: { id_rol: 1 } });

  if (!admin) {
    let hash = await encrypt(process.env.ADMIN_PASSWORD);
    await User.create({
      name: "admin",
      email: process.env.ADMIN_EMAIL,
      password: hash,
      id_rol: 1,
    });
  }
};
