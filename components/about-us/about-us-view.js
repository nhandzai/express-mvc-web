async function renderAboutUsPage(req, res) {
    res.render('about-us', {
      title: 'About Us',
    });
  }
  module.exports = { renderAboutUsPage };