export const formatSweet = (sweet) => ({
  id: sweet._id.toString(),
  name: sweet.name,
  category: sweet.category,
  price: sweet.price,
  quantity: sweet.quantity,
});

export const formatSweetsList = (sweets) => sweets.map(formatSweet);
