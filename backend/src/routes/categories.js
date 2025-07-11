import express from "express";
import { Router } from "express";
import { verifyToken } from "../security/token.js";
import { getCategories } from "../controllers/categoriesController.js";

const router = Router();

router.get("/categories", getCategories);

export default router;
