const { getUser } = require('../services/auth');

const restrictUser = (req, res, next) => {
    // Correctly check if the cookie 'uid' exists in the request
    if (!req.cookies.uid) {
        return res.redirect('/');
    }

    const user = getUser(req.cookies.uid);
    console.log(user)
    if (user) {
        req.user = user;
    }

    next();
};

module.exports = { restrictUser };

