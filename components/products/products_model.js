const db = require('../../library/models');

async function fetchProductById(productId) {
  return await db.products.findByPk(productId);
}

module.exports = { fetchProductById };