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

    if (queries.length === 0) {
      throw new Error('Search query is missing');
    }
    const queryArray = Array.isArray(queries) ? queries : [queries];
    console.log(queryArray)
    const products = await fetchFilterProducts(queryArray);
    console.log(products)
    renderCatalogPage(res, products);
  } catch (error) {
    next(error);
  }
}

async function handleSearchQuery(req, res, next) {
  try {
    if (!req.query) {
      throw new Error('Search query is missing');
    }
    if (req.query.qf) {
      return getFilterProducts(req, res, next)
    }
    else {
      return getSearchProducts(req, res, next)
    }

  } catch (error) {
    next(error);
  }
}

module.exports = { getCatalog, getSearchProducts, getFilterProducts, handleSearchQuery };

