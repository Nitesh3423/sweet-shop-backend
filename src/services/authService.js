import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";

export const registerUser = async ({ username, password, email }) => {
  if (!username || !password) {
    const err = new Error("username and password are required");
    err.status = 400;
    throw err;
  }

  const existing = await User.findOne({ username });
  if (existing) {
    const err = new Error("username already exists");
    err.status = 409;
    throw err;
  }

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  const user = new User({ username, password: hashed, email });
  await user.save();

  const token = generateToken({ id: user._id, username: user.username });

  return { token, user: { id: user._id.toString(), username: user.username } };
};

export const loginUser = async ({ username, password }) => {
  if (!username || !password) {
    const err = new Error("username and password are required");
    err.status = 400;
    throw err;
  }

  const user = await User.findOne({ username });
  if (!user) {
    const err = new Error("invalid credentials");
    err.status = 401;
    throw err;
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    const err = new Error("invalid credentials");
    err.status = 401;
    throw err;
  }

  const token = generateToken({ id: user._id, username: user.username });

  return token;
};
