import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import todoRoutes from "./routes/todo.route.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/api/todos", todoRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use(cookieParser());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
