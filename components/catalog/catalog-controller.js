const { fetchAllProducts } = require('./catalog-model'); 
const { renderCatalogPage } = require('./catalog-view'); 

async function getCatalog(req, res, next) {
  try {
    const products = await fetchAllProducts(); 
    renderCatalogPage(res, products); 
  } catch (error) {
    next(error); 
  }
}

module.exports = { getCatalog };

