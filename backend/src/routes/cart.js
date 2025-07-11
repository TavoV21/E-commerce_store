import express from "express";
import { Router } from "express";
import {
  createCart,
  getCart,
  deleteCart,
} from "../controllers/cartController.js";

const router = Router();

router.post("/cart", createCart);

router.get("/cart/:id", getCart);

router.delete("/cart/:id", deleteCart);

export default router;
