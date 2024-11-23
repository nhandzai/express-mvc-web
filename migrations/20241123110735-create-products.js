'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Tạo bảng 'products'
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
      image_link: {
        type: Sequelize.STRING
      },
      short_description: {
        type: Sequelize.TEXT
      },
      detail: {
        type: Sequelize.TEXT
      },
      material: {
        type: Sequelize.STRING
      },
      weight_kg: {
        type: Sequelize.FLOAT
      },
      color: {
        type: Sequelize.STRING
      },
      promotion: {
        type: Sequelize.INTEGER // Chỉ lưu giá trị số
      },
      branch: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      stock_quantity: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Thêm dữ liệu vào bảng 'products'
    await queryInterface.bulkInsert('products', [
      {
        name: "CHAIR",
        price: "$55.00",
        image_link: "images/product-chair.png",
        short_description: "This ergonomic chair is designed for comfort and support, making it perfect for long hours at work. Its sleek, modern look complements any workspace or living area.",
        detail: "This ergonomic chair combines both style and function, offering exceptional lumbar support for long hours of sitting. Its modern design features clean lines and a contemporary aesthetic that suits both home offices and professional settings.",
        material: "Fabric, Steel, Wood",
        weight_kg: 4.5,
        color: "Black, Gray, White",
        promotion: 10, // Chỉ ghi số mà không có "% off"
        branch: "APEX",
        category: "Office",
        stock_quantity: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "SOFA",
        price: "$79.00",
        image_link: "images/product-sofa.png",
        short_description: "A cozy sofa with plush cushions, offering both style and comfort for your living room. Its simple design makes it a versatile piece that suits any interior decor.",
        detail: "A roomy, Italian-style sofa made to be comfortable and convenient in your home. This sofa is both fashionable and long-lasting, with luxurious cushions and premium upholstery. It is ideal for living rooms or communal areas because of its ample size, which comfortably fits several people. It may be easily incorporated into a variety of decor styles thanks to its exquisite yet simple design.",
        material: "Upholstery, Wood, Foam",
        weight_kg: 34.0,
        color: "Navy Blue, Beige, Brown",
        promotion: 15,
        branch: "Call of SOFA",
        category: "Living Room",
        stock_quantity: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "GUYER KITCHEN",
        price: "$120.00",
        image_link: "images/kitchen.png",
        short_description: "This stylish kitchen set offers ample storage space, making it perfect for home cooking enthusiasts. Its clean lines and modern design bring a fresh feel to any home.",
        detail: "The Guyer Kitchen set is designed to combine functionality with modern aesthetics. Featuring plenty of storage options, it is perfect for organizing kitchen essentials while adding a sleek, contemporary look to your cooking space. It’s ideal for those who value both practicality and style in their kitchens.",
        material: "Wood, Stainless Steel",
        weight_kg: 68.2,
        color: "White, Silver, Charcoal",
        promotion: 5,
        branch: "Puff B&G",
        category: "Office",
        stock_quantity: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "GUYER ROOM",
        price: "$89.00",
        image_link: "images/living-room.png",
        short_description: "A sophisticated living room set designed for ultimate comfort and style. The pieces are carefully crafted to fit together seamlessly in any living space.",
        detail: "The Guyer Room set offers a combination of luxurious comfort and modern style. This set is ideal for creating a welcoming and elegant atmosphere in your living space. With its seamless design, it fits perfectly in both contemporary and classic interiors, ensuring comfort without compromising style.",
        material: "Wood, Fabric, Foam",
        weight_kg: 54.4,
        color: "Light Gray, Cream, Brown",
        promotion: 20,
        branch: "Fornighte",
        category: "Living Room",
        stock_quantity: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "BEDROOM",
        price: "$65.00",
        image_link: "images/bedroom.png",
        short_description: "This bedroom set is designed to provide comfort and relaxation. The soothing colors and high-quality materials create a peaceful environment for restful sleep.",
        detail: "The Bedroom set combines sophisticated design with maximum comfort, ensuring a restful night’s sleep. Made with premium materials and soothing hues, it brings tranquility to your space while offering plenty of storage solutions and a stylish, modern aesthetic.",
        material: "Wood, Fabric, Foam",
        weight_kg: 59.0,
        color: "Pastel Blue, White, Beige",
        promotion: 8,
        branch: "APEX",
        category: "Bedroom",
        stock_quantity: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "LIVING GUYER",
        price: "$99.00",
        image_link: "images/header-bg.jpeg",
        short_description: "This versatile living room set offers both comfort and elegance. With a modern touch, it’s perfect for creating a stylish, cozy environment in any home.",
        detail: "The Living Guyer set is crafted to fit perfectly in any modern living room, offering both comfort and elegance. Its unique design combines plush cushions with a stylish frame, making it ideal for creating a cozy yet chic space. Whether you're hosting guests or relaxing, this set offers both style and durability.",
        material: "Wood, Fabric, Foam",
        weight_kg: 49.9,
        color: "Green, Black, Gray",
        promotion: 12,
        branch: "Call of SOFA",
        category: "Living Room",
        stock_quantity: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "STREET CHAIR",
        price: "$49.00",
        image_link: "images/outdoors.png",
        short_description: "A durable outdoor chair that combines sturdy construction with comfort for outdoor spaces. Perfect for patios, gardens, or balconies, it adds both functionality and style.",
        detail: "The Street Chair is designed for outdoor comfort and durability. Constructed with weather-resistant materials, it’s ideal for patios, gardens, and balconies. Its ergonomic design ensures comfort for hours of sitting, while its sleek, modern aesthetic adds a touch of style to any outdoor area.",
        material: "Metal, Fabric",
        weight_kg: 6.8,
        color: "Gray, Black, Green",
        promotion: 18,
        branch: "Puff B&G",
        category: "Outdoor",
        stock_quantity: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "WHITE SOFA",
        price: "$75.00",
        image_link: "images/product-bigsofa.png",
        short_description: "A roomy and fashionable sofa with high-quality upholstery for both durability and comfort. Its minimalist design fits well with a variety of home decor styles.",
        detail: "A roomy, Italian-style sofa made to be comfortable and convenient in your home. This sofa is both fashionable and long-lasting, with luxurious cushions and premium upholstery. It is ideal for living rooms or communal areas because of its ample size, which comfortably fits several people. It may be easily incorporated into a variety of decor styles thanks to its exquisite yet simple design.",
        material: "Upholstery, Wood, Foam",
        weight_kg: 38.6,
        color: "White, Black, Gray",
        promotion: 10,
        branch: "Fornighte",
        category: "Living Room",
        stock_quantity: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};
