const express = require('express');
const router = express.Router();

// Controllers
const homeController = require('../components/home/home-controller');
const catalogController = require('../components/catalog/catalog-controller');
const productsController = require('../components/products/products-controller');
const aboutUsController = require('../components/about-us/about-us-controller');
const contactUsController = require('../components/contact-us/contact-us-controller');
const userController = require('../components/users/users-controller');


router.get('/', homeController.getHome);
router.get('/home', homeController.getHome);


router.get('/catalog', catalogController.getCatalog);


router.get('/product', productsController.getProduct);


router.get('/about-us', aboutUsController.getAboutUs);
router.get('/contact-us', contactUsController.getContactUs);
router.get('/sign-up', userController.getSignUp);

module.exports = router;

