import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
import jwt from "jsonwebtoken";
//login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }
  const { accessToken, refreshToken } = generateToken(user, res);
  res.json({ accessToken, refreshToken });
};
//register user
export const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    const { accessToken, refreshToken } = generateToken(newUser, res);
    res.status(201).json({ message: "User registered successfully" , accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};
//logout 
export const logoutUser = async (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "User logged out successfully" });
};
//refresh token
export const refreshToken = async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token not found" });
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }
    const newAccessToken = jwt.sign({ id: user.id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    res.cookie('accessToken', newAccessToken, {
      maxAge: 15 * 60 * 1000, // 15 minutes
      httpOnly: true,
      secure: false, // Set to true in production (HTTPS)
      sameSite: 'strict',
    });
    res.status(200).json({ accessToken: newAccessToken });
  });
};