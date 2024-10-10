const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    res.status(401).render('error', {
        errorMsg: 'NOT AUTHENTICATED',
        btnMsg: 'Go back to LOGIN page',
    });
};

const preventAuthRoutesIfAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }

    next();
};

module.exports = { isAuth, preventAuthRoutesIfAuth };
