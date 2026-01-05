import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    status: {
      type: String,
      enum: ["active", "suspended"],
      default: "active",
    },

    lastSeenAt: Date,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("User", userSchema);
