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

async function searchPriceProducts(minPrice, maxPrice) {
  if (minPrice == null || maxPrice == null) {
    throw new Error('Both minPrice and maxPrice are required.');
  }

  const products = await db.products.findAll({
    where: {
      price: {
        [db.Sequelize.Op.between]: [minPrice, maxPrice]
      }
    }
  });

  return products;
}

async function searchFilterProducts(queries) {
  if (!queries || queries.length === 0) {
    throw new Error('Search query is required.');
  }

  const categoryQueries = queries.filter(query => query.includes('bedroom') || query.includes('sofa') || query.includes('matrass') || query.includes('outdoor') || query.includes('kitchen') || query.includes('living room'));
  const brandQueries = queries.filter(query => query.includes('APEX') || query.includes('Cof') || query.includes('Puff B&G') || query.includes('Fornighte'));
  const sizeQueries = queries.filter(query => query.includes('XS') || query.includes('S') || query.includes('M') || query.includes('L') || query.includes('XL'));

  const whereClause = {
    [db.Sequelize.Op.and]: []
  };

  if (categoryQueries.length > 0) {
    whereClause[db.Sequelize.Op.and].push({
      category: {
        [db.Sequelize.Op.in]: categoryQueries 
      }
    });
  }

  if (brandQueries.length > 0) {
    whereClause[db.Sequelize.Op.and].push({
      brand: {
        [db.Sequelize.Op.in]: brandQueries 
      }
    });
  }

  if (sizeQueries.length > 0) {
    whereClause[db.Sequelize.Op.and].push({
      [db.Sequelize.Op.or]: sizeQueries.map(size => ({
        size: {
          [db.Sequelize.Op.like]: `%${size}%` 
        }
      }))
    });
  }

  const products = await db.products.findAll({
    where: whereClause
  });

  return products;
}
``

module.exports = { searchProducts, searchPriceProducts, searchFilterProducts };
