const authController = {};

authController.isLoggedIn = (req, res, next) => {
  console.log('checking log status', req.isAuthenticated(), req.session.passport.user)
    if (req.isAuthenticated()) {
        return next();
    } else {
    res.status(401).send('failed');
    }
}

module.exports = authController;