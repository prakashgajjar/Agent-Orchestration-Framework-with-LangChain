import Chat from "../models/Chat.models.js";

export const createChat = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware

    const chat = await Chat.create({
      userId,
      title: "New Chat",
    });

    res.status(201).json({
      message: "Chat created",
      chat,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create chat" });
  }
};

export const getUserChats = async (req, res) => {
  try {
    const userId = req.user.id;

    const chats = await Chat.find({ userId, isArchived: false })
      .sort({ updatedAt: -1 });

      console.log("Fetched chats:", chats);

    res.status(200).json(chats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch chats" });
  }
};
