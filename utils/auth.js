const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
      res.redirect('/login'); // redirect if not auth; logged in; no session
    } else {
      next();
    }
  };
  
  module.exports = withAuth;