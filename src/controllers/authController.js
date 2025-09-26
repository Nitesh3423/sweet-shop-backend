import * as authService from "../services/authService.js";

export const register = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const result = await authService.registerUser({ username, password, email });
    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};


