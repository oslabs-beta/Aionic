const authController = {};

authController.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
    res.status(401).send('Not logged in');
    }
}

module.exports = authController;