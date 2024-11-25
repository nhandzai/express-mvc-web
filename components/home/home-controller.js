const { fetchProductsByField, sortProductsByPrice } = require('./home-model');
const { renderHomePage } = require('./home-view');

async function getHome(req, res, next) {
  try {
    const products = await sortProductsByPrice(4);
    renderHomePage(res, products);
  } catch (error) {
    next(error);
  }
}

module.exports = { getHome };

