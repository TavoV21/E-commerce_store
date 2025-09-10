import { Categorie } from "../models/Categories.js";

export const getCategories = async (req, res) => {
  try {
    const categorie = await Categorie.findAll();
    return res.status(200).json(categorie);
  } catch (error) {
    return res.status(500).json({ mensaje: "Internal server error" });
  }
};
