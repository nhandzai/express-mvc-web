async function renderHomePage(res, products) {
  res.render('home', {
    title: 'Home',
    products: products,
  });
}

module.exports = { renderHomePage };
