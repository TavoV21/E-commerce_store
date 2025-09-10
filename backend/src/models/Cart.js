import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../db.js";

export const Cart = sequelize.define(
  "cart",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_product: {
      type: DataTypes.INTEGER,
    },
    id_user: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "cart",
    freezeTableName: true,
  }
);
