import { Cart } from "../models/Cart.js";
import { Product } from "../models/Products.js";

export const createCart = async (req, res) => {
  try {
    const { id_product, id_user } = req.body;

    if (!id_product || !id_user) {
      return res.sendStatus(400);
    }

    const cart = await Cart.create({
      id_product: id_product,
      id_user: id_user,
    });

    console.log(cart);

    return res
      .status(200)
      .json({ message: "Cart create sucessfully", cart: cart });
  } catch (error) {
    return res.status(500).json({ messageServer: "Internal server error" });
  }
};

export const getCart = async (req, res) => {
  try {
    const { id } = req.params;

    const cart = await Cart.findAll({
      attributes: ["id", "id_product", "id_user"],
      include: [
        {
          model: Product,
          attributes: ["name", "image", "price"],
        },
      ],
      where: {
        id_user: id,
      },
    });

    /* if (cart.length === 0) {
      return res.status(404).json({ message: "Cart not found" });
    } */

    console.log(cart);

    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ messageServer: "Internal server error" });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const { id } = req.params;

    const cart = await Cart.destroy({
      where: {
        id: id,
      },
    });

    if (cart === 0) {
      return res.status(404).json({ message: "Cart not found" });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ messsageServer: "Internal server error" });
  }
};
