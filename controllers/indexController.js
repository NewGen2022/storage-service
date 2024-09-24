const welcomePage = (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/directory');
    } else {
        res.render('welcome_page');
    }
};

const indexRender = (req, res) => {
    res.render('index', { user: req.user });
};

module.exports = { welcomePage, indexRender };
