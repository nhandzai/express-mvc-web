const { fetchAllProducts, fetchProducts, fetchFilterProducts } = require('./catalog-model');
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

async function getFilterProducts(req, res, next) {
  try {
    const queries = req.query.qf || [];

    let minPrice = req.query.minPrice ? parseFloat(req.query.minPrice) : 0;
    let maxPrice = req.query.maxPrice ? parseFloat(req.query.maxPrice) : 99999;

    if (isNaN(minPrice)) {
      minPrice = 0;
    }
    if (isNaN(maxPrice)) {
      maxPrice = 99999;
    }

    const queryArray = Array.isArray(queries) ? queries : [queries];
    console.log(queryArray, minPrice, maxPrice);

    const products = await fetchFilterProducts(minPrice, maxPrice, queryArray);
    console.log(products);
    renderCatalogPage(res, products);
  } catch (error) {
    next(error);
  }
}

async function handleSearchQuery(req, res, next) {
  try {
    const { qf, minPrice, maxPrice } = req.query;

    if (qf || minPrice || maxPrice) {
      return getFilterProducts(req, res, next);
    } else {
      return getSearchProducts(req, res, next);
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { getCatalog, getSearchProducts, getFilterProducts, handleSearchQuery };