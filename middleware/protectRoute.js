import {  User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { logErrorToFileWithStack } from "../utils/logErrorToFile.js";
export const protectRoute = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      logErrorToFileWithStack(
        "Access token not found in cookies",
        401
      );
      return res.status(401).json({ message: "Access token not found" });
    }
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    if (!decoded) {
      return res.status(403).json({ message: "Invalid access token" });
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};
