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

module.exports = { getSearchProducts };