const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../storage/storage');
const upload = multer({ storage });
const { isAuth } = require('../middleware/authMidware');
const {
    welcomePage,
    indexRender,
    fileInfoRender,
    addDir,
    addFile,
    deleteFileController,
    deleteDirController,
} = require('../controllers/indexController');
const { getRootDir } = require('../db/queries');

// GET ROUTES
router.get('/', welcomePage);

router.get('/directory', isAuth, async (req, res) => {
    const rootDir = await getRootDir(req.user.id);
    res.redirect(`/directory/${rootDir.id}`);
});

router.get('/directory/:dirId', isAuth, indexRender);

router.get('/file/:fileId', isAuth, fileInfoRender);

// POST ROUTES
router.post('/directory/create/new', isAuth, addDir);

router.post('/file/create/new', isAuth, upload.single('file'), addFile);

router.post('/file/delete/:id', isAuth, deleteFileController);

router.post('/directory/delete/:id', isAuth, deleteDirController);

module.exports = router;
