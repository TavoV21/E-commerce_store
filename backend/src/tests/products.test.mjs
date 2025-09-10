import request from "supertest";
import { app, startServer } from "../index.js";
import jwt from "jsonwebtoken";
import path from "path";
import { Product } from "../models/Products.js";
import sequelize from "../db.js";

const secret = process.env.SECRET;
const __dirname = path.resolve();

describe("PRODUCTS TESTING", () => {
  let IdProduct = "";

  beforeAll(async () => {
    await startServer();
  });

  afterAll(async () => {
    try {
      await Product.destroy({
        truncate: true,
        cascade: true,
      });

      await sequelize.close();
    } catch (error) {
      console.error(
        "Error cleaning the database or closing the connection",
        error
      );
    }
  });

  describe("Route: POST /products", () => {
    const imagePath = path.join(__dirname, "src", "public/uploads/coca.jpg");
    const wrongImage = path.join(__dirname, "src", "public/uploads/hit.webp");

    const productData = {
      name: "product_test",
      image: imagePath,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam voluptatum nam aliquid quidem harum odio consequuntur aut repellendus ipsum. Quod sed repellat quos iste delectus soluta excepturi illo obcaecati quia.",
      price: 18000,
      id_categorie: 5,
    };

    test("When the image is not sent", async () => {
      const response = await request(app)
        .post("/api/products")
        .field("name", productData.name)
        .attach("image", "")
        .field("description", productData.description)
        .field("price", productData.price)
        .field("id_categorie", productData.id_categorie);

      expect(response.statusCode).toBe(400);
    });

    test("When some data is missing", async () => {
      const bodyProduct = {
        name: productData.name,
        description: productData.description,
        price: productData.price,
        id_categorie: productData.id_categorie,
      };
      for (const key in bodyProduct) {
        const response = await request(app)
          .post("/api/products")
          .field(key, bodyProduct[key])
          .attach("image", productData.image);

        expect(response.statusCode).toBe(400);
      }
    });

    test("If I send an invalid image type", async () => {
      const response = await request(app)
        .post("/api/products")
        .field("name", productData.name)
        .attach("image", wrongImage)
        .field("description", productData.description)
        .field("price", productData.price)
        .field("id_categorie", productData.id_categorie);
      expect(response.statusCode).toBe(500);
    });

    test("When all the data is correct", async () => {
      const response = await request(app)
        .post("/api/products")
        .field("name", productData.name)
        .attach("image", productData.image)
        .field("description", productData.description)
        .field("price", productData.price)
        .field("id_categorie", productData.id_categorie);

      IdProduct = response.body.product.id;

      expect(response.statusCode).toBe(200);
    });
  });

  describe("Route: GET /products ", () => {
    test("When you have authorization token", async () => {
      const token = jwt.sign({ id: 1 }, secret, { expiresIn: "1h" });
      console.log(token);

      const response = await request(app)
        .get("/api/products")
        .set("x-access-token", token);

      expect(response.statusCode).toBe(200);
    });

    test("When you do not have an authorization token", async () => {
      const response = await request(app)
        .get("/api/products")
        .set("x-access-token", "");

      expect(response.statusCode).toBe(401);
    });
  });

  describe("Route: PUT /products/id", () => {
    const newImagePath = path.join(
      __dirname,
      "src",
      "public/uploads/fanta.jpg"
    );

    const newProduct = {
      name: "newProduct_test",
      image: newImagePath,
      description: "This is a different text description",
      price: 20000,
      id_categorie: 2,
    };
    test("If the data is correct then the product will be updated", async () => {
      const response = await request(app)
        .put(`/api/products/${IdProduct}`)
        .field("name", newProduct.name)
        .attach("image", newProduct.image)
        .field("description", newProduct.description)
        .field("price", newProduct.price)
        .field("id_categorie", newProduct.id_categorie);

      expect(response.statusCode).toBe(200);
    });

    test("When the image is not sent", async () => {
      const response = await request(app)
        .put(`/api/products/${IdProduct}`)
        .field("name", newProduct.name)
        .attach("image", "")
        .field("description", newProduct.description)
        .field("price", newProduct.price)
        .field("id_categorie", newProduct.id_categorie);

      expect(response.statusCode).toBe(400);
    });

    test("If a product is not found by ID, it will not be updated", async () => {
      const response = await request(app)
        .put(`/api/products/999`)
        .field("name", newProduct.name)
        .attach("image", newProduct.image)
        .field("description", newProduct.description)
        .field("price", newProduct.price)
        .field("id_categorie", newProduct.id_categorie);

      expect(response.statusCode).toBe(404);
    });

    test("When some data is missing", async () => {
      const bodyProduct = {
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        id_categorie: newProduct.id_categorie,
      };

      for (const data in bodyProduct) {
        const response = await request(app)
          .put(`/api/products/${IdProduct}`)
          .field(data, bodyProduct[data])
          .attach("image", newProduct.image);

        expect(response.statusCode).toBe(400);
      }
    });
  });

  describe("Route: DELETE /products/id", () => {
    test("When I send a non-existent id", async () => {
      const response = await request(app).delete("/api/products/999");
      expect(response.statusCode).toBe(404);
    });

    test("If I send a correct ID then the product is deleted.", async () => {
      const response = await request(app).delete(`/api/products/${IdProduct}`);
      expect(response.statusCode).toBe(204);
    });
  });
});
