import express from "express";
import { Router } from "express";
import { verifyToken } from "../security/token.js";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productsController.js";

const router = Router();

router.get("/products", verifyToken, getProducts);

router.post("/products", createProduct);

router.put("/products/:id", updateProduct);

router.delete("/products/:id", deleteProduct);

export default router;
