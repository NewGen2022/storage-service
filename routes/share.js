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

module.exports = router;
