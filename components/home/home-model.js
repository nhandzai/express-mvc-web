const db = require('../../library/models');

async function fetchAllProducts() {
  return await db.products.findAll();
}

module.exports = { fetchAllProducts };
