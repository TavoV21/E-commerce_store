import sequelize from "./src/db.js";
import { startServer } from "./src/index.js";

beforeAll(async () => {
  await startServer();
});

afterAll(async () => {
  try {
    await sequelize.close();
  } catch (error) {
    console.error(
      "Error cleaning the database or closing the connection",
      error
    );
  }
});
