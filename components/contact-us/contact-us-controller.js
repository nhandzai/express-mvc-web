const { renderContactUsPage } = require('./contact-us-view'); 
const getContactUs = (req, res) => {
renderContactUsPage(req, res);
};
module.exports = {
  getContactUs,
};