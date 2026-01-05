import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      default: "New Chat",
      trim: true,
    },

    lastMessageAt: {
      type: Date,
      index: true,
    },

    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// sidebar performance
chatSchema.index({ userId: 1, updatedAt: -1 });

export default mongoose.model("Chat", chatSchema);
