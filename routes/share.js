const express = require('express');
const router = express.Router();
const { shareFile, shareDir } = require('../controllers/shareController');

// POST ROUTES
router.post('/file/share/:fileId', shareFile);

router.post('/directory/share/:dirId', shareDir);

module.exports = router;
