import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../db.js";
import { Product } from "./Products.js";

export const Categorie = sequelize.define(
  "categories",
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
  }
);

Categorie.hasMany(Product, {
  foreignKey: "id_categorie",
  sourceKey: "id",
});

Product.belongsTo(Categorie, {
  foreignKey: "id_categorie",
  targetId: "id",
});

Categorie.createDefaultData = async () => {
  const categories = await Categorie.findAll();
  if (categories.length === 0) {
    await Categorie.bulkCreate([
      { id: 1, name: "Electronico" },
      { id: 2, name: "Ropa" },
      { id: 3, name: "Hogar" },
      { id: 4, name: "Deporte" },
      { id: 5, name: "Accesorios" },
    ]);
  }
};
