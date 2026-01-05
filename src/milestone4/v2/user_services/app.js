import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/connectDB.js";

import AuthRoutes from "./routes/auth/Auth.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import messageRoutes from "./routes/message.routes.js";

const app = express();
configDotenv();
connectDB();

app.use(cookieParser());
app.use(express.json());
// app.use(express.static("public/images"));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.static("public"));

app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api", AuthRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
