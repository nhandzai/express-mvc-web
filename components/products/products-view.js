async function renderProductPage(res, product) {
  res.render('product', {
    title: 'Product Details',
    product: product,
  });
}

module.exports = { renderProductPage };