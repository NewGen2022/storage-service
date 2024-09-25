const express = require('express');
const router = express.Router();
const { isAuth } = require('../middleware/authMidware');
const {
    welcomePage,
    indexRender,
    addDir,
    addFile,
} = require('../controllers/indexController');
const { getRootDir } = require('../db/queries');

// GET ROUTES
router.get('/', welcomePage);

router.get('/directory', isAuth, async (req, res) => {
    const rootDir = await getRootDir();
    res.redirect(`/directory/${rootDir.id}`);
});

router.get('/directory/:dirId', isAuth, indexRender);

// POST ROUTES
router.post('/directory/create/new', isAuth, addDir);

router.post('/file/create/new', isAuth, addFile);

module.exports = router;
