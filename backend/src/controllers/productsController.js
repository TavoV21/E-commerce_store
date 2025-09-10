import { Product } from "../models/Products.js";

export const getProducts = async (req, res) => {
  try {
    const product = await Product.findAll();
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ messageServer: "Internal server error" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, id_categorie } = req.body;

    if (
      !req.file?.originalname ||
      !name ||
      !description ||
      !price ||
      !id_categorie
    ) {
      return res.status(400).json({ message: "Bad request" });
    }

    const image = req.file.originalname;

    const product = await Product.create({
      name: name,
      image: image,
      description: description,
      price: price,
      id_categorie: id_categorie,
    });

    console.log(product);

    return res
      .status(200)
      .json({ message: "Product create successfully", product: product });
  } catch (error) {
    return res.status(500).json({ messageServer: "Internal server error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, id_categorie } = req.body;

    if (
      !req.file?.originalname ||
      !name ||
      !description ||
      !price ||
      !id_categorie
    ) {
      return res.status(400).json({ message: "Bad request" });
    }

    const image = req.file.originalname;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name;
    product.image = image;
    product.description = description;
    product.price = price;
    product.id_categorie = id_categorie;
    await product.save();

    console.log(product);

    return res
      .status(200)
      .json({ message: "Product updated successfully", product: product });
  } catch (error) {
    return res.status(500).json({ messageServer: "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.destroy({
      where: {
        id: id,
      },
    });

    if (product === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ mensaje: "Internal server error" });
  }
};
