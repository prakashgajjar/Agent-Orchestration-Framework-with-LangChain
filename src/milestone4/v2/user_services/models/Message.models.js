import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
      index: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    prompt: {
      type: String,
      required: true,
      trim: true,
    },

    // AI outputs
    aiResponse: {
      research: {
        type: String,
        required: true,
      },
      summary: {
        type: String,
        required: true,
      },
    },

    ai: {
      provider: String,
      model: String,
    },
  },
  { timestamps: true, versionKey: false }
);

messageSchema.index({ chatId: 1, createdAt: 1 });

export default mongoose.model("Message", messageSchema);
