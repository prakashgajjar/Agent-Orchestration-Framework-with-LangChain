import express from "express";
import { createChat, getUserChats } from "../controllers/chat.controller.js";
import auth from "../middleware/Auth.middleware.js";

const router = express.Router();

router.post("/", auth, createChat);
router.get("/", auth, getUserChats);

export default router;
