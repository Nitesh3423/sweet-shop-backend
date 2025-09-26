import Sweet from "../models/Sweet.js";
import { createError } from "../utils/errors.js";
import { formatSweet, formatSweetsList } from "../utils/response.js";

export const addSweet = async ({ name, category, price, quantity }) => {
  if (!name || !category || price == null || quantity == null) {
    throw createError(400, "All fields (name, category, price, quantity) are required");
  }

  const sweet = new Sweet({ name, category, price, quantity });
  await sweet.save();

  return formatSweet(sweet);
};

export const getAllSweets = async () => {
  const sweets = await Sweet.find().lean();
  return formatSweetsList(sweets);
};

export const searchSweets = async ({ name, category, minPrice, maxPrice }) => {
  const query = {};

  if (name) {
    query.name = { $regex: name, $options: "i" }; // case-insensitive search
  }
  if (category) {
    query.category = { $regex: category, $options: "i" };
  }
  if (minPrice != null || maxPrice != null) {
    query.price = {};
    if (minPrice != null) query.price.$gte = Number(minPrice);
    if (maxPrice != null) query.price.$lte = Number(maxPrice);
  }

  const sweets = await Sweet.find(query).lean();
  return formatSweetsList(sweets);
};
