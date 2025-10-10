import request from "supertest";
import { app } from "../index.js";
import sequelize from "../db.js";

describe("CATEGORIES TESTING", () => {
  /* afterAll(async () => {
    try {
      await sequelize.close();
    } catch (error) {
      console.error(
        "Error cleaning the database or closing the connection",
        error
      );
    }
  }); */

  describe("Route: GET /categories", () => {
    test("All category data will be obtained if everything is correct", async () => {
      const response = await request(app).get("/api/categories");
      expect(response.status).toBe(200);
    });

    test("Should specify json in the content type header", async () => {
      const response = await request(app).get("/api/categories");

      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
  });
});
