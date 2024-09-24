const { getAllDirectories } = require('../db/queries');

const welcomePage = (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/directory');
    } else {
        res.render('welcome_page');
    }
};

const indexRender = async (req, res) => {
    const dirs = await getAllDirectories();
    res.render('index', { user: req.user, dirs: dirs });
};

module.exports = { welcomePage, indexRender };
