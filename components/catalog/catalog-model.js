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

async function fetchFilterProducts(minPrice, maxPrice, queries) {
  const products = await searchFilterProducts(minPrice, maxPrice, queries);
  return products;
}

module.exports = { fetchAllProducts, fetchProducts, fetchFilterProducts };