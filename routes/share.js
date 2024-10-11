const express = require('express');
const router = express.Router();
const { isAuth } = require('../middleware/authMidware');
const {
    isValidShareDirLink,
    isValidShareFileLink,
} = require('../middleware/validationMidware');
const {
    showSharedFileController,
    showSharedDirController,
    shareFileController,
    shareDirController,
} = require('../controllers/shareController');
const { downloadFileController } = require('../controllers/indexController');

// GET ROUTES
router.get(
    '/share/file/:fileId',
    isValidShareFileLink,
    showSharedFileController
);

router.get(
    '/share/directory/:dirId',
    isValidShareDirLink,
    showSharedDirController
);

// POST ROUTES
router.post('/share/file/:fileId', isAuth, shareFileController);

router.post('/share/directory/:dirId', isAuth, shareDirController);

router.post('/download/share/file/:fileId', downloadFileController);

module.exports = router;
