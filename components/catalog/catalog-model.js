const db = require('../../library/models');
const { searchProducts, searchFilterProducts } = require('../../library/search');

async function fetchAllProducts() {
  return await db.products.findAll();
}

async function fetchProducts(query) {
  if (!query) {
    throw new Error('Search query is required.');
  }
  const products = await searchProducts(query); 
  return products;
}

async function fetchFilterProducts(queries) {
  if (!queries || queries.length === 0) {
    throw new Error('Search query is required.');
  }
  const products = await searchFilterProducts(queries);
  return products;
}

module.exports = { fetchAllProducts, fetchProducts, fetchFilterProducts };
