import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // if already connected
    if (mongoose.connection.readyState >= 1) {
      console.log("MongoDB already connected");
      return;
    }

    // connect
    await mongoose.connect(process.env.MONGO_URI,);

    console.log("MongoDB connection successful");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

export default connectDB;
