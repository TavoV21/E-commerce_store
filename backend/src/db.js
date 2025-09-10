import { Sequelize } from "sequelize";
import {
  DB_USER,
  DB_HOST,
  DB_DATABASE,
  DB_PASSWORD,
  DB_PORT,
} from "./config.js";

const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
});

export default sequelize;

/* async function testConnection() {
  try {
    await sequelize.sync();
    console.log("\x1b[32mConectado exitosamente a la base de datos\x1b[0m");
  } catch (error) {
    console.log("\x1b[31mError al conectarse a la base de datos\x1b[0m", error);
  }
}

testConnection(); */

/* import pg from "pg";
import {
  DB_USER,
  DB_HOST,
  DB_DATABASE,
  DB_PASSWORD,
  DB_PORT,
} from "./config.js";

const pool = new pg.Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: DB_PORT,
});

pool
  .query("SELECT 1")
  .then(() =>
    console.log("\x1b[32mConectado exitosamente a la base de datos\x1b[0m")
  )
  .catch((error) =>
    //console.log("\x1b[31mError al conectarse a la base de datos\x1b[0m"),
    console.log(error)
  );

export default pool; */
