module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.status(401).json({ success: false, message: 'Not authenticated' });
    },
    forwardAuthenticated: function (req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        res.status(403).json({ success: false, message: 'Already authenticated' });
    }
};
