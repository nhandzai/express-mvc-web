const { fetchAllProducts } = require('./home-model'); 
const { renderHomePage } = require('./home-view'); 

async function getHome(req, res, next) {
  try {
    const products = await fetchAllProducts(); 
    renderHomePage(res, products); 
  } catch (error) {
    next(error); 
  }
}

module.exports = { getHome };

