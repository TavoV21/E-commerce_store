import request from "supertest";
import { app } from "../index.js";
import sequelize from "../db.js";

describe("CATEGORIES TESTING", () => {
  describe("Route: GET /categories", () => {
    test("All category data will be obtained if everything is correct", async () => {
      const response = await request(app).get("/api/categories");
      expect(response.statusCode).toBe(200);
    });

    test("Should specify json in the content type header", async () => {
      const response = await request(app).get("/api/categories");

      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
  });
});
