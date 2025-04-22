// Middleware to check if user is authenticated
export const userAuth = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    } else {
        return res.status(403).json({ message: 'User not authenticated' });
    }
};
export const adminAuth = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    } else {
        return res.status(403).json({ message: 'User not authenticated' });
    }
};




