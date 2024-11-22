const { fetchProductById } = require('./products_model');
const { renderProductPage } = require('./products-view');

async function getProduct(req, res, next) {
  try {
    const productId = +req.query.id;
    const product = await fetchProductById(productId); 
    if (!product) {
      return res.status(404).send('Product not found');
    }
    renderProductPage(res, product);
  } catch (error) {
    next(error);
  }
}

module.exports = { getProduct };