const User = require('../models/User');

module.exports = async (req, res, next) => {
    try {
        // req.user is already set by authMiddleware
        const user = await User.findByPk(req.user.id);

        console.log(`[AdminCheck] UserID: ${req.user.id}, isAdmin: ${user ? user.isAdmin : 'USER NOT FOUND'}`);

        if (!user || !user.isAdmin) {
            return res.status(403).json({ msg: 'Access Denied: Admins only' });
        }

        next();
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
