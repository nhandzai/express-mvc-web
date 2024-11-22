const ejs = require('ejs');
const path = require('path');

module.exports = function (req, res, next, product) {
    return new Promise((resolve, reject) => {
        ejs.renderFile(path.join(__dirname, '../views/product.ejs'), { product }, function (err, productHomeStr) {
            if (err) return reject(err);  // Trả lỗi nếu có
            resolve(productHomeStr);  // Trả về kết quả render
        });
    });
};
