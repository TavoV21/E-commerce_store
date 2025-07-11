import { pool } from "../db.js";

export const getProducts = async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM products");
  return res.status(200).json(rows);
};

export const createProduct = async (req, res) => {
  const data = req.body;
  const image = req.file.originalname;

  try {
    const { rows } = await pool.query(
      "INSERT INTO products (name,image,description,price,id_categorie) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [data.name, image, data.description, data.price, data.id_categorie]
    );

    return res
      .status(200)
      .json({ message: "Product create successfully", product: rows[0] });
  } catch (error) {
    console.log(error);

    if (error?.code === "23502") {
      return res.status(400).json({ message: "Bad request" });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const image = req.file.originalname;

    const { rows } = await pool.query(
      "UPDATE  products SET name = $1, image = $2, description= $3, price= $4, id_categorie= $5    WHERE id = $6 RETURNING *",
      [data.name, image, data.description, data.price, data.id_categorie, id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res
      .status(200)
      .json({ message: "Product updated successfully", product: rows[0] });
  } catch (error) {
    if (error?.code === "23502") {
      return res.status(400).json({ message: "Bad request" });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const { rowCount } = await pool.query("DELETE FROM products WHERE id= $1", [
    id,
  ]);
  if (rowCount === 0) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.sendStatus(204);
};
