const { searchProducts } = require('../../library/search');

async function fetchProducts(query) {
  if (!query) {
    throw new Error('Search query is required.');
  }
  const products = await searchProducts(query); 
  return products;
}

module.exports = { fetchProducts };
