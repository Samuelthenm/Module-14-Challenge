const withAuth = (req, res, next) => {
    if (!req.session.logged_in) {
        return res.status(403).json({ message: "Please log in to access this resource." });
    }
    next();
};

module.exports = withAuth;