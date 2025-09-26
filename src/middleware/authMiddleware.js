import jwt from "jsonwebtoken";
import { createError } from "../utils/errors.js";

const JWT_SECRET = process.env.JWT_SECRET || "test_secret";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(createError(401, "Unauthorized"));
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return next(createError(401, "Invalid token"));
  }
};
