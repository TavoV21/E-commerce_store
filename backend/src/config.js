import dotenv from "dotenv";

dotenv.config({
  path:
    process.env.NODE_ENV === "test"
      ? ".env.test"
      : process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env",
});

console.log(process.env.NODE_ENV);
console.log(process.env.POSTGRES_USER);
console.log(process.env.POSTGRES_HOST);
console.log(process.env.POSTGRES_DB);
console.log(process.env.POSTGRES_PASSWORD);
console.log(process.env.POSTGRES_PORT);
console.log(process.env.SECRET);

export const DB_USER = process.env.POSTGRES_USER;
export const DB_HOST = process.env.POSTGRES_HOST;
export const DB_DATABASE = process.env.POSTGRES_DB;
export const DB_PASSWORD = process.env.POSTGRES_PASSWORD;
export const DB_PORT = process.env.POSTGRES_PORT;

export const PORT = process.env.PORT || 5000;
