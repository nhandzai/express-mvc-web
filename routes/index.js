const express = require('express');
const router = express.Router();

// Controllers
const homeController = require('../components/home/home-controller');
const catalogController = require('../components/catalog/catalog-controller');
const productsController = require('../components/products/products-controller');
const aboutUsController = require('../components/about-us/about-us-controller');
const contactUsController = require('../components/contact-us/contact-us-controller');
const userController = require('../components/users/users-controller');


async function handleSearchQuery(req, res, next, searchController, defaultController) {
    if (req.query.q) {
        searchController(req, res, next);
    } else {
        defaultController(req, res, next);
    }
}

router.get('/', (req, res, next) => {
    handleSearchQuery(req, res, next, catalogController.getSearchProducts, homeController.getHome);
});

router.get('/home', (req, res, next) => {
    handleSearchQuery(req, res, next, catalogController.getSearchProducts, homeController.getHome);
});

router.get('/catalog', (req, res, next) => {
    handleSearchQuery(req, res, next, catalogController.getSearchProducts, catalogController.getCatalog);
});

router.get('/product', (req, res, next) => {
    handleSearchQuery(req, res, next, catalogController.getSearchProducts, productsController.getProduct);
});

router.get('/about-us', (req, res, next) =>{
    handleSearchQuery(req,res,next, catalogController.getSearchProducts, aboutUsController.getAboutUs);
});

router.get('/contact-us', (req, res, next) =>{
    handleSearchQuery(req,res,next, catalogController.getSearchProducts, contactUsController.getContactUs);
});

router.get('/sign-up', userController.getSignUp);
router.get('/log-in', userController.getLogin);

module.exports = router;

