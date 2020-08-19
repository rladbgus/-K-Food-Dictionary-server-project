
module.exports = {
  post: (req, res) => {
    console.log('여기');
    req.session.destroy((err) => {
      if (!err) {
        res.clearCookie('user');
        res.status(302).redirect('/');
      } else {
        res.status(400).end();
      }
    })
  }
};