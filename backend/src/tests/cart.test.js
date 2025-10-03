import request from "supertest";
import { app, startServer } from "../index.js";
import sequelize from "../db.js";
import { Cart } from "../models/Cart.js";
import { User } from "../models/Users.js";
import { Product } from "../models/Products.js";

describe("CART TESTING", () => {
  let idProduct = "";
  let idUser = "";
  let idCart = "";

  beforeAll(async () => {
    await startServer();
  });

  beforeAll(async () => {
    // Create a new user

    try {
      const newUser = await User.create({
        name: "user_test",
        email: "test@example.com",
        password: "1223",
        id_rol: 2,
      });
      idUser = newUser.id;
    } catch (error) {
      console.error("Error creating user", error);
    }
  });

  beforeAll(async () => {
    // Create a new product
    try {
      const newProduct = await Product.create({
        name: "product_test",
        image: "cien.jpg",
        description: "This is a short description",
        price: 21500,
        id_categorie: 5,
      });
      idProduct = newProduct.id;
    } catch (error) {
      console.error("Error creating product", error);
    }
  });

  afterAll(async () => {
    try {
      await User.destroy({
        truncate: true,
        cascade: true,
      });
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

  describe("Route: POST /cart", () => {
    test("When all the data is correct", async () => {
      const bodyCart = {
        id_product: idProduct,
        id_user: idUser,
      };
      const response = await request(app).post("/api/cart").send(bodyCart);

      idCart = response.body.cart.id;

      expect(response.statusCode).toBe(200);
    });

    test("When some data is missing", async () => {
      const dataCart = [{ id_product: idProduct }, { id_user: idUser }, {}];

      for (const data of dataCart) {
        const response = await request(app).post("/api/cart").send(data);
        expect(response.statusCode).toBe(400);
      }
    });
  });

  describe("Route: GET /cart/id", () => {
    test("If I send a correct ID, the cart data will be obtained", async () => {
      const response = await request(app).get(`/api/cart/${idUser}`);

      expect(response.statusCode).toBe(200);
    });

    /* test("If the cart is not found by id then the data will not be obtained.", async () => {
      const response = await request(app).get("/api/cart/1234567890");
      expect(response.statusCode).toBe(404);
    }); */
  });

  describe("Route: DELETE /cart/id", () => {
    test("If the id is correct then the cart will be deleted", async () => {
      const response = await request(app).delete(`/api/cart/${idCart}`);
      expect(response.statusCode).toBe(204);
    });

    test("If the id is not found then the cart will not be deleted.", async () => {
      const response = await request(app).delete("/api/cart/1234567890");
      expect(response.statusCode).toBe(404);
    });
  });
});
