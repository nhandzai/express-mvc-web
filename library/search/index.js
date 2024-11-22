const lunr = require("lunr");
const db = require('../models');


let productIndex;

async function initializeIndex() {
    const productData = await db.products.findAll();

    productIndex = lunr(function () {
        this.ref("id");
        this.field("name", { boost: 10 });
        this.field("short_description");
        this.field("material");
        this.field("detail");

        productData.forEach(product => {
            this.add({
                id: product.id,
                name: product.name,
                short_description: product.short_description,
                material: product.material,
                detail: product.detail
            });
        });
    });

    console.log("Lunr.js index created.");
}
async function searchProducts(query) {
    if (!productIndex) {
        await initializeIndex();
    }

    const results = productIndex.search(query);
    console.log('Search results:', results);

    const productIds = results.map(result => result.ref);

    const products = await db.products.findAll({
        where: {
            id: productIds
        }
    });

    return products;
}
initializeIndex();
module.exports = { searchProducts, initializeIndex };
