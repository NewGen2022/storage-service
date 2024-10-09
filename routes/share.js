const express = require('express');
const router = express.Router();
const {
    shareFileController,
    shareDirController,
} = require('../controllers/shareController');

// POST ROUTES
router.post('/file/share/:fileId', shareFileController);

router.post('/directory/share/:dirId', shareDirController);

module.exports = router;
