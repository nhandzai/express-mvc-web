const { fetchAllProducts, fetchProducts } = require('./catalog-model');
const { renderCatalogPage } = require('./catalog-view');

async function getCatalog(req, res, next) {
  try {
    const products = await fetchAllProducts();
    renderCatalogPage(res, products);
  } catch (error) {
    next(error);
  }
}

async function getSearchProducts(req, res, next) {
  try {
    if (!req.query.q) {
      throw new Error('Search query is missing');
    }
    const query = req.query.q;
    const products = await fetchProducts(query);
    renderCatalogPage(res, products);
  } catch (error) {
    next(error);
  }
}

module.exports = { getCatalog, getSearchProducts };
