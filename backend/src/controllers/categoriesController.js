import { pool } from "../db.js";

export const getCategories = async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM categories");

  return res.status(200).json(rows);
};
