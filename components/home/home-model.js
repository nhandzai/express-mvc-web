const db = require('../../library/models');

async function fetchAllProducts() {
  return await db.products.findAll();
}
async function sortProductsByPrice(limit) {
  const products = await db.products.findAll({
    order: [['promotion', 'DESC']],
    limit: limit || 8,
  });

  return products;
}
module.exports = { fetchAllProducts, sortProductsByPrice };
