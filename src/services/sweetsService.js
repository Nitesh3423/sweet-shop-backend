import Sweet from "../models/Sweet.js";
import { createError } from "../utils/errors.js";

export const addSweet = async ({ name, category, price, quantity }) => {
  if (!name || !category || price == null || quantity == null) {
    throw createError(400, "All fields (name, category, price, quantity) are required");
  }

  const sweet = new Sweet({ name, category, price, quantity });
  await sweet.save();

  return {
    id: sweet._id.toString(),
    name: sweet.name,
    category: sweet.category,
    price: sweet.price,
    quantity: sweet.quantity
  };
};

export const getAllSweets = async () => {
  const sweets = await Sweet.find().lean();
  return sweets.map((s) => ({
    id: s._id.toString(),
    name: s.name,
    category: s.category,
    price: s.price,
    quantity: s.quantity,
  }));
};