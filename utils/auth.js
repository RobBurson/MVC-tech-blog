const withAuth = (req, res, next) => {
    if (!req.session.userId) {
      res.redirect('/login'); // redirect if not auth; logged in; no session
    } else {
      next();
    }
  };
  
  module.exports = withAuth;