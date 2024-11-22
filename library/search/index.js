const db = require('../models');

async function searchProducts(query) {
    if (!query) {
      throw new Error('Search query is required.');
    }
  
    const products = await db.products.findAll({
      where: {
        [db.Sequelize.Op.or]: [
          { name: { [db.Sequelize.Op.like]: `%${query}%` } },
          { short_description: { [db.Sequelize.Op.like]: `%${query}%` } },
          { material: { [db.Sequelize.Op.like]: `%${query}%` } },
          { detail: { [db.Sequelize.Op.like]: `%${query}%` } }
        ]
      }
    });
  
    return products;
  }

module.exports = { searchProducts };
