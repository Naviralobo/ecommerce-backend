import mongoose from "mongoose";
import {env} from "./env";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(env.MONGO_DB_URL);

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
