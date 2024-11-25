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

async function searchFilterProducts(minPrice, maxPrice, queries) {
  const whereClause = {};

  if (minPrice != null && maxPrice != null) {
    whereClause.price = {
      [db.Sequelize.Op.between]: [minPrice, maxPrice],
    };
  } else if (minPrice != null) {
    whereClause.price = {
      [db.Sequelize.Op.gte]: minPrice,
    };
  } else if (maxPrice != null) {
    whereClause.price = {
      [db.Sequelize.Op.lte]: maxPrice,
    };
  }

  if (queries && queries.length > 0) {
    const categoryQueries = queries.filter(query =>
      ['bedroom', 'sofa', 'matrass', 'outdoor', 'kitchen', 'living room'].includes(query)
    );
    const brandQueries = queries.filter(query =>
      ['APEX', 'Cof', 'Puff B&G', 'Fornighte'].includes(query)
    );
    const sizeQueries = queries.filter(query =>
      ['XS', 'S', 'M', 'L', 'XL'].includes(query)
    );

    if (categoryQueries.length > 0) {
      whereClause.category = {
        [db.Sequelize.Op.in]: categoryQueries,
      };
    }

    if (brandQueries.length > 0) {
      whereClause.brand = {
        [db.Sequelize.Op.in]: brandQueries,
      };
    }

    if (sizeQueries.length > 0) {
      whereClause[db.Sequelize.Op.and] = sizeQueries.map(size => ({
        size: {
          [db.Sequelize.Op.or]: [
            { [db.Sequelize.Op.like]: `${size},%` },
            { [db.Sequelize.Op.like]: `%, ${size},%` },
            { [db.Sequelize.Op.like]: `%, ${size}` },
            { [db.Sequelize.Op.eq]: size },
          ],
        },
      }));
    }
  }
  const products = await db.products.findAll({
    where: whereClause,
  });

  return products;
}
async function searchProductsByField({
  field,
  value,
  excludeId,
  limit,
 
}) {
  if (!field || !value) {
    throw new Error('Field and value are required.');
  }

  const whereClause = {
    [field]: {
      [db.Sequelize.Op.eq]: value,
    },
  };

  if (excludeId) {
    whereClause.id = {
      [db.Sequelize.Op.ne]: excludeId,
    };
  }

  const queryOptions = {
    where: whereClause,
    limit: limit || 10, 
  };

  const products = await db.products.findAll(queryOptions);

  return products;
}





module.exports = { searchProducts, searchFilterProducts,searchProductsByField };
