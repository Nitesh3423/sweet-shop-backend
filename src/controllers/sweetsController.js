import * as sweetsService from "../services/sweetsService.js";

export const addSweet = async (req, res, next) => {
  try {
    const { name, category, price, quantity } = req.body;
    const result = await sweetsService.addSweet({ name, category, price, quantity });
    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const getAllSweets = async (req, res, next) => {
  try {
    const sweets = await sweetsService.getAllSweets();
    return res.status(200).json(sweets);
  } catch (err) {
    next(err);
  }
};

export const searchSweets = async (req, res, next) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;
    const sweets = await sweetsService.searchSweets({ name, category, minPrice, maxPrice });
    return res.status(200).json(sweets);
  } catch (err) {
    next(err);
  }
};
