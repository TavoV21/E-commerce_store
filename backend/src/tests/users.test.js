import request from "supertest";
import { app } from "../index.js";
import jwt from "jsonwebtoken";
import { User } from "../models/Users.js";
import sequelize from "../db.js";

const secret = process.env.SECRET;

describe("USER TESTING", () => {
  let userId = "";

  afterAll(async () => {
    try {
      await User.destroy({
        truncate: true,
        cascade: true,
      });

      // await sequelize.close();
    } catch (error) {
      console.error(
        "Error cleaning the database or closing the connection",
        error
      );
    }
  });

  describe("Route POST /registerUsers", () => {
    const user = {
      name: "tavo",
      email: "gustavoadolfovilladacamargo@gmail.com",
      password: "123456",
      id_rol: "2",
    };

    beforeEach(async () => {
      await User.destroy({
        truncate: true,
        cascade: true,
      });
    });

    test("When some data is missing", async () => {
      const bodyData = [
        { name: "tavo" },
        { email: "test@gmail.com" },
        { password: "1234" },
        { id_rol: "2" },
        {},
      ];
      for (const data of bodyData) {
        const response = await request(app)
          .post("/api/registerUsers")
          .send(data);
        expect(response.statusCode).toBe(400); //if the response is 400, then it will pass
      }
    });

    test("should specify json in the content type header", async () => {
      const response = await request(app).post("/api/registerUsers").send(user);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      ); //If the response header contain json, then it will pass
    });

    test("Response has token", async () => {
      const response = await request(app).post("/api/registerUsers").send(user);
      expect(response.body.token).toBeDefined(); //If the response body contains the token data then it will pass
    });

    test("When the data is correct", async () => {
      const response = await request(app).post("/api/registerUsers").send(user);
      userId = response.body.user.id;
      expect(response.statusCode).toBe(200); //if the data is correct, then it will pass
    });
  });

  describe("Route: POST /loginUser", () => {
    const user = {
      email: "gustavoadolfovilladacamargo@gmail.com",
      password: "123456",
    };
    test("when the data is correct", async () => {
      const response = await request(app).post("/api/loginUser").send(user);

      expect(response.statusCode).toBe(200);
    });

    test("When some data is missing", async () => {
      const bodyData = [{ email: "test@gmail.com" }, { password: "1234" }, {}];

      for (const data of bodyData) {
        const response = await request(app).post("/api/loginUser").send(data);
        expect(response.statusCode).toBe(400);
      }
    });

    test("Response has token", async () => {
      const response = await request(app).post("/api/loginUser").send(user);
      expect(response.body.token).toBeDefined();
    });

    test("if the email is incorrect", async () => {
      const user2 = {
        email: "test@hotmail.es",
        password: user.password,
      };

      const response = await request(app).post("/api/loginUser").send(user2);

      expect(response.statusCode).toBe(404);
    });

    test("if the password is incorrect", async () => {
      const user3 = {
        email: user.email,
        password: "12345xyz",
      };

      const response = await request(app).post("/api/loginUser").send(user3);

      expect(response.statusCode).toBe(401);
    });
  });

  describe("Route: POST /sendEmail", () => {
    test("when an email is sent successfully", async () => {
      const response = await request(app)
        .post("/api/sendEmail")
        .send({ email: "gustavoadolfovilladacamargo@gmail.com" });
      expect(response.statusCode).toBe(200);
    });

    test("when sending an empty email", async () => {
      const response = await request(app)
        .post("/api/sendEmail")
        .send({ email: "" });
      expect(response.statusCode).toBe(400);
    });

    test("if the email does not exist", async () => {
      const response = await request(app)
        .post("/api/sendEmail")
        .send({ email: "test00@gmail.com" });
      expect(response.statusCode).toBe(404);
    });
  });

  describe("Route: GET /users", () => {
    test("when you have authorization token ", async () => {
      const token = jwt.sign({ id: 1 }, secret, { expiresIn: "1h" });
      console.log(token);

      const response = await request(app)
        .get("/api/users")
        .set("x-access-token", token);

      expect(response.statusCode).toBe(200);
    });

    test("when you do not have an authorization token", async () => {
      const response = await request(app)
        .get("/api/users")
        .set("x-access-token", "");

      expect(response.statusCode).toBe(401);
    });
  });

  describe("Route: GET /users/id", () => {
    test("when a correct id is sent", async () => {
      const response = await request(app).get(`/api/users/${userId}`).send();
      expect(response.statusCode).toBe(200);
    });

    test("when a non-existent id is sent", async () => {
      const response = await request(app).get("/api/users/999").send();
      expect(response.statusCode).toBe(404);
    });
  });

  describe("Route: PUT /users/id", () => {
    const userBody = {
      name: "Gustavo",
      email: "tavo21test@gmail.com",
    };
    test("If everything is correct then it is updated", async () => {
      const response = await request(app)
        .put(`/api/users/${userId}`)
        .send(userBody);
      expect(response.statusCode).toBe(200);
    });

    test("When some data is missing", async () => {
      const bodyData = [{ name: userBody.name }, { email: userBody.email }, {}];

      for (const data of bodyData) {
        const response = await request(app)
          .put(`/api/users/${userId}`)
          .send(data);
        expect(response.statusCode).toBe(400);
      }
    });

    test("When I send an ID that does not exist", async () => {
      const response = await request(app).put("/api/users/999").send(userBody);
      expect(response.statusCode).toBe(404);
    });
  });

  describe("Route: PUT /users/changePassword/email", () => {
    const dataUserPassword = {
      password: "123456",
      newpassword: "654321",
    };

    const currentEmail = "tavo21test@gmail.com";

    test("When I send an email that does not exist", async () => {
      const response = await request(app)
        .put("/api/users/changePassword/ovni@gmail.com")
        .send(dataUserPassword);
      expect(response.statusCode).toBe(404);
    });

    test("When the password does not match the current user password", async () => {
      const data = {
        password: "1234",
        newpassword: dataUserPassword.newpassword,
      };
      const response = await request(app)
        .put(`/api/users/changePassword/${currentEmail}`)
        .send(data);

      expect(response.statusCode).toBe(401);
    });

    test("When some data password is missing", async () => {
      const bodyDataPassword = [
        { password: dataUserPassword.password },
        { newpassword: dataUserPassword.newpassword },
        {},
      ];

      for (const data of bodyDataPassword) {
        const response = await request(app)
          .put(`/api/users/changePassword/${currentEmail}`)
          .send(data);

        expect(response.statusCode).toBe(400);
      }
    });

    test("When the data is correct", async () => {
      const response = await request(app)
        .put(`/api/users/changePassword/${currentEmail}`)
        .send(dataUserPassword);

      expect(response.statusCode).toBe(200);
    });
  });

  describe("Route: DELETE /users/id", () => {
    test("When a non-existent user id is sent", async () => {
      const response = await request(app).delete("/api/users/999").send();
      expect(response.statusCode).toBe(404);
    });

    test("If I send an existing user id then it will be deleted", async () => {
      const response = await request(app).delete(`/api/users/${userId}`).send();
      expect(response.statusCode).toBe(204);
    });
  });
});
