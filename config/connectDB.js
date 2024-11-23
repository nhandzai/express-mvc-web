const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('defaultdb', 'avnadmin', "AVNS_cqHrlHR8P625NwNZXqk", {
    host: 'db-web-express-phamhoangkha14032004-1eee.b.aivencloud.com',
    dialect: 'mysql'
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
module.exports = connectDB;