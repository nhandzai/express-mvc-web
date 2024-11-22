const { renderAboutUsPage} =require("./about-us-view")
const getAboutUs = (req, res) => {
    renderAboutUsPage(req, res);
  };
  module.exports = {
    getAboutUs,
  };