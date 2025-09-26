import Sweet from "../models/Sweet.js";

export const addSweet = async ({ name, category, price, quantity }) => {
  if (!name || !category || price == null || quantity == null) {
    const err = new Error("All fields (name, category, price, quantity) are required");
    err.status = 400;
    throw err;
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
