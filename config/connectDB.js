const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('bdsnualyms1ak5fmxvfs', 'ucuthzsaexbsm5cc', "9cQJgtkaiW77ks1zI1u0", {
    host: 'bdsnualyms1ak5fmxvfs-mysql.services.clever-cloud.com',
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