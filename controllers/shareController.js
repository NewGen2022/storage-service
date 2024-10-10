const { calculateExpireAt } = require('../public/js/timeFormatting');
const { createShareDirLink } = require('../db/queries');

// SHOW SHARE LINK CONTROLLERS
const showSharedFileController = async (req, res) => {};

const showSharedDirController = async (req, res) => {
    res.render('sharedDir');
};

// CREATE SHARE LINK CONTROLLERS
const shareFileController = async (req, res) => {};

const shareDirController = async (req, res) => {
    const dirId = req.params.dirId;
    const duration = req.body.duration;
    const expiresAt = calculateExpireAt(Number(duration));

    try {
        const shareDirLink = await createShareDirLink(dirId, expiresAt);
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
