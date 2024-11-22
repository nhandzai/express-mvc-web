const db = require('../../library/models');
const { searchProducts } = require('../../library/search');

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

module.exports = { fetchAllProducts, fetchProducts };