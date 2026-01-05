import express from "express";
import {
  sendMessage,
  getChatMessages,
} from "../controllers/message.controller.js";
import auth from "../middleware/Auth.middleware.js";

const router = express.Router();

router.post("/", auth, sendMessage);
router.get("/:chatId", auth, getChatMessages);

export default router;
