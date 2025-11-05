import dotenv from "dotenv";

dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

console.log(process.env.NODE_ENV);
console.log(process.env.POSTGRES_USER ?? "USER undefined");
console.log(process.env.POSTGRES_HOST ?? "HOST undefined");
console.log(process.env.POSTGRES_DB ?? "DB undefined");
console.log(process.env.POSTGRES_PASSWORD ?? "PASSWORD undefined");
console.log(process.env.POSTGRES_PORT ?? "PORT DB undefined");
console.log(process.env.POSTGRES_URL ?? "URL undefined");

console.log(process.env.SECRET);

export const DB_USER = process.env.POSTGRES_USER;
export const DB_HOST = process.env.POSTGRES_HOST;
export const DB_DATABASE = process.env.POSTGRES_DB;
export const DB_PASSWORD = process.env.POSTGRES_PASSWORD;
export const DB_PORT = process.env.POSTGRES_PORT;
export const DB_URL = process.env.POSTGRES_URL;

export const PORT = process.env.PORT || 5000;
