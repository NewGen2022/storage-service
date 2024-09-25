const {
    getAllUserDirectories,
    createDirectory,
    createFile,
    directoryExists,
} = require('../db/queries');
const { formatDate } = require('../public/js/timeFormatting');

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
        const currentDirId = req.params.dirId || null;

        const dirs = await getAllUserDirectories(userId);
        const currentDir =
            dirs.find((directory) => directory.id === currentDirId) || null;

        res.render('index', {
            user: req.user,
            dirs: dirs,
            currentDirId: currentDirId,
            currentDir: currentDir,
            formatDate: formatDate,
        });
    } catch (err) {
        console.error('Error fetching user directories:', err);
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
        res.redirect(`/directory/${parentId}`);
    } catch (err) {
        console.error('Error creating directory:', err);
        req.flash('error', 'Failed to create directory. Please try again.');
        res.redirect('/directory');
    }
};

const addFile = async (req, res) => {
    const fileName = req.body.fileName;
    const parentId = req.body.parentId;

    try {
        const dirExists = await directoryExists(parentId);
        if (!dirExists) {
            req.flash('error', 'Parent directory does not exist.');
            return res.redirect(`/directory/${parentId}`);
        }

        const newFile = await createFile(fileName, parentId);
        res.redirect(`/directory/${parentId}`);
    } catch (err) {
        console.error('Error creating file:', err);
        req.flash('error', 'Failed to create file. Please try again.');
        res.redirect(`/directory/${parentId}`);
    }
};

module.exports = { welcomePage, indexRender, addDir, addFile };
