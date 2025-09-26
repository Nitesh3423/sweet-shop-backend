import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "test_secret";

export const generateToken = (payload) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
