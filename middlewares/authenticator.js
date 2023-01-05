
// User authentication middleware
module.exports.userAuthenticator = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ msg: 'User is not authenticated' });
    } else if (req.user && (req.user.exp < (new Date().getTime() / 1000))) {
        return res.status(401).json({ msg: 'User session expire' });
    } else {
        return next();
    }
}

// Admin authentication middleware
module.exports.adminAuthenticator = (req, res, next) => {

    if (!req.adminUser) {
        return res.status(401).json({ msg: 'User is not authenticated' });
    } else if (req.adminUser && (req.adminUser.exp < (new Date().getTime() / 1000))) {
        return res.status(401).json({ msg: 'User session expire' });
    } else {
        return next();
    }
}