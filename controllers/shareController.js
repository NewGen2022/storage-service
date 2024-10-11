const { calculateExpireAt } = require('../public/js/timeFormatting');
const {
    createShareFileLink,
    createShareLinkDirRecursively,
} = require('../db/queries');

const { renderFileInfo } = require('./indexController');

// SHOW SHARE LINK CONTROLLERS
const showSharedFileController = async (req, res) => {
    const fileId = req.params.fileId;
    res.locals.isSharedFile = true;

    await renderFileInfo(res, fileId);
};

const showSharedDirController = async (req, res) => {
    res.render('sharedDir');
};

// CREATE SHARE LINK CONTROLLERS
const shareFileController = async (req, res) => {
    const userId = req.user.id;
    const fileId = req.params.fileId;
    const duration = req.body.duration;
    const expiresAt = calculateExpireAt(Number(duration));

    try {
        // Create share link for the file
        const shareFileLink = await createShareFileLink(
            fileId,
            expiresAt,
            userId
        );

        res.status(201).json(shareFileLink);
    } catch (err) {
        console.error('Error creating share link for file:', err);
        req.flash('error', 'Error creating share link for file');
    }
};

const shareDirController = async (req, res) => {
    const userId = req.user.id;
    const dirId = req.params.dirId;
    const duration = req.body.duration;
    const expiresAt = calculateExpireAt(Number(duration));

    try {
        // Create share link for the main directory
        // and recursively share all contents of the directory
        const shareDirLink = await createShareLinkDirRecursively(
            dirId,
            expiresAt,
            userId
        );

        res.status(201).json(shareDirLink);
    } catch (err) {
        console.error('Error creating share link for directory:', err);
        req.flash('error', 'Error creating share link for directory');
    }
};

module.exports = {
    showSharedFileController,
    showSharedDirController,
    shareFileController,
    shareDirController,
};
