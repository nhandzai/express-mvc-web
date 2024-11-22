async function renderCatalogPage(res, products) {
  res.render('catalog', {
    title: 'Catalog',
    products: products,
  });
}
module.exports = { renderCatalogPage };