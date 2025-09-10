import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../db.js";
import { Cart } from "./Cart.js";

export const Product = sequelize.define("products", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
  },
  id_categorie: {
    type: DataTypes.INTEGER,
  },
});

Product.hasMany(Cart, {
  foreignKey: "id_product",
  sourceKey: "id",
});

Cart.belongsTo(Product, {
  foreignKey: "id_product",
  targetId: "id",
});
