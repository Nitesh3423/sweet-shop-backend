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
