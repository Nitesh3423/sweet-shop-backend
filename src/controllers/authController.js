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

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const token = await authService.loginUser({ username, password });
    return res.json({ token });
  } catch (err) {
    next(err);
  }
};
