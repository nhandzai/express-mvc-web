const { Sequelize } = require('sequelize');
const config = require('./config.js')[process.env.NODE_ENV || 'development'];  // Đọc cấu hình từ config.js

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    port: config.port || 3306,  // Sử dụng port từ config hoặc mặc định là 3306
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = connectDB;
