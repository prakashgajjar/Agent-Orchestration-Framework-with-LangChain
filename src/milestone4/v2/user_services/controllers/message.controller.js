import Message from "../models/Message.models.js";
import Chat from "../models/Chat.models.js";

export const sendMessage = async (req, res) => {
  try {
    const userId = req.user.id;
    let { chatId, prompt, research, summary } = req.body;

    // 🔴 Validate required fields (chatId NOT required now)
    if (!prompt || !research || !summary) {
      return res.status(400).json({
        message: "prompt, research, and summary are required",
      });
    }

    let chat;

    /* --------------------------------------------------
       1️⃣ If chatId NOT provided → create new chat
    -------------------------------------------------- */
    if (!chatId) {
      chat = await Chat.create({
        userId,
        title: prompt.length > 50 ? prompt.substring(0, 50) + "…" : prompt,
        lastMessageAt: new Date(),
      });

      chatId = chat._id;
    } else {
      /* --------------------------------------------------
         2️⃣ Fetch existing chat
      -------------------------------------------------- */
      chat = await Chat.findOne({ _id: chatId, userId });

      if (!chat) {
        return res.status(404).json({ message: "Chat not found" });
      }
    }

    /* --------------------------------------------------
       3️⃣ Store message
    -------------------------------------------------- */
    const message = await Message.create({
      chatId,
      userId,
      prompt,
      aiResponse: {
        research,
        summary,
      },
      ai: {
        provider: "frontend-ai",
        model: "multi-agent",
      },
    });

    /* --------------------------------------------------
       4️⃣ Update chat metadata
    -------------------------------------------------- */
    chat.lastMessageAt = new Date();
    await chat.save();

    /* --------------------------------------------------
       5️⃣ Return EVERYTHING frontend needs
    -------------------------------------------------- */
    res.status(201).json({
      message: "Message stored successfully",
      chatId, // ✅ IMPORTANT
      data: message, // ✅ full message
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send message" });
  }
};

export const getChatMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    const messages = await Message.find({ chatId }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};
