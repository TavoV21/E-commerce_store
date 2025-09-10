import express from "express";
import userRoutes from "./routes/users.js";
import productRoutes from "./routes/products.js";
import categorieRoutes from "./routes/categories.js";
import cartRoutes from "./routes/cart.js";
import morgan from "morgan";
import cors from "cors";
import multer from "multer";
import { PORT } from "./config.js";
import path from "path";
import sequelize from "./db.js";
import { Rol } from "./models/Rol.js";
import { User } from "./models/Users.js";
import { Categorie } from "./models/Categories.js";
import { Product } from "./models/Products.js";
import { Cart } from "./models/Cart.js";

const __dirname = path.resolve();

const app = express();
const PREFIX = "/api/";

//middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
const storage = multer.diskStorage({
  destination: path.join(__dirname, "src", "public/uploads"),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

app.use(
  multer({
    storage,
    limits: { fileSize: 8000000 }, //tamaño de la imagen 1 megabyte
    fileFilter: (req, file, cb) => {
      const filetypes = /jpeg|jpg|png|gif/;
      const mimetype = filetypes.test(file.mimetype);
      const extname = filetypes.test(path.extname(file.originalname));
      if (mimetype && extname) {
        return cb(null, true);
      }
      cb("Error: el archivo debe ser una imagen valida");
    },
  }).single("image")
);

app.use(express.static(path.join(__dirname, "src", "public"))); //crea una ruta en el navegador para acceder publicamente a las imagenes

//routes
app.use(PREFIX, userRoutes);
app.use(PREFIX, productRoutes);
app.use(PREFIX, categorieRoutes);
app.use(PREFIX, cartRoutes);

//init connection BD and init port

async function startServer() {
  try {
    await sequelize.sync({ alter: true });
    await Rol.createDefaultData();
    await Categorie.createDefaultData();
    console.log("\x1b[32mConectado exitosamente a la base de datos\x1b[0m");
    app.listen(PORT, () => {
      console.log(`\x1b[33mServer on PORT: ${PORT}\x1b[0m`);
    });
  } catch (error) {
    console.log("\x1b[31mError al conectarse a la base de datos\x1b[0m", error);
  }
}

if (process.env.NODE_ENV === "development") {
  startServer();
}

export { app, startServer };
