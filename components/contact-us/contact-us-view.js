async function renderContactUsPage(req, res) {
    res.render('contact-us', {
      title: 'Contact Us',
    
    });
  }
  module.exports = { renderContactUsPage };