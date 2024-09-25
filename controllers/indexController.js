const { getAllUserDirectories, createDirectory } = require('../db/queries');

const welcomePage = (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/directory');
    } else {
        res.render('welcome_page');
    }
};

const indexRender = async (req, res) => {
    try {
        const userId = req.user.id;
        const dirs = await getAllUserDirectories(userId);
        const currentDirId = req.params.dirId || null;

        res.render('index', {
            user: req.user,
            dirs: dirs,
            currentDirId: currentDirId,
        });
    } catch (error) {
        console.error('Error fetching user directories:', error);
        req.flash(
            'error',
            'Unable to load directories. Please try again later.'
        );
        res.redirect('/directory'); // Redirect to a safe route
    }
};

const addDir = async (req, res) => {
    const dirName = req.body.dirName;
    const userId = req.user.id;
    const parentId = req.body.parentId;

    try {
        const newDir = await createDirectory(dirName, userId, parentId);
        res.redirect(`/directory/${newDir.id}`);
    } catch (error) {
        console.error('Error creating directory:', error);
        req.flash('error', 'Failed to create directory. Please try again.');
        res.redirect('/directory');
    }
};

module.exports = { welcomePage, indexRender, addDir };
