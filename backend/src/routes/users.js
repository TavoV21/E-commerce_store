import express from "express";
import { Router } from "express";
import { pool } from "../db.js";
import {
  getUsers,
  getUserById,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  sendEmailToRecover,
  updatePassword,
} from "../controllers/usersController.js";
import { verifyToken } from "../security/token.js";

const router = Router();

router.get("/users", verifyToken, getUsers);

router.get("/users/:id", getUserById);

router.post("/registerUsers", registerUser);

router.post("/loginUser", loginUser);

router.put("/users/:id", updateUser);

router.delete("/users/:id", deleteUser);

router.post("/sendEmail", sendEmailToRecover);

router.put("/users/changePassword/:email", updatePassword);

export default router;
