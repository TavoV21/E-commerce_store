import { pool } from "../db.js";

export const createCart = async (req, res) => {
  const data = req.body;

  try {
    const { rows } = await pool.query(
      "INSERT INTO cart (id_product, id_user) VALUES ($1,$2) RETURNING *",
      [data.id_product, data.id_user]
    );

    return res
      .status(200)
      .json({ message: "Cart create sucessfully", cart: rows[0] });
  } catch (error) {
    console.log(error);
    if (error?.code === "23502") {
      return res.status(400).json({ message: "Bad request" });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getCart = async (req, res) => {
  const { id } = req.params;

  const { rows } = await pool.query(
    "SELECT cart.id, cart.id_product, cart.id_user, products.name, products.image, products.price FROM products JOIN cart ON products.id = cart.id_product WHERE cart.id_user = $1",
    [id]
  );

  /* if (rows.length === 0) {
    return res.status(400).json({ message: "Cart not found" });
  }

  console.log(rows); */

  return res.status(200).json(rows);
};

export const deleteCart = async (req, res) => {
  const { id } = req.params;

  const { rowCount } = await pool.query("DELETE FROM cart WHERE id = $1", [id]);

  if (rowCount === 0) {
    return res.status(404).json({ message: "Cart not found" });
  }

  return res.sendStatus(204);
};
