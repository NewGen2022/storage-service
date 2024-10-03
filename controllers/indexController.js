const {
    getAllUserDirectories,
    getFileById,
    createDirectory,
    createFile,
    deleteFile,
    deleteDir,
    updateDirName,
    directoryExists,
} = require('../db/queries');
const {
    formatDate,
    formatDateDetailed,
} = require('../public/js/timeFormatting');
const { formatFileSize } = require('../public/js/formatFileSize');
const { buildBreadCrumb } = require('../public/js/breadCrumb');
const { uploadFileSB, deleteFileSB } = require('../storage/supabase');
const iconv = require('iconv-lite');
const { transliterate } = require('../public/js/transliteration');

const welcomePage = (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/directory');
    } else {
        res.render('welcome_page', { dirs: [] });
    }
};

// GET CONTROLLERS
const indexRender = async (req, res) => {
    try {
        const userId = req.user.id;
        const currentDirId = req.params.dirId || null;

        const dirs = await getAllUserDirectories(userId);
        const currentDir =
            dirs.find((directory) => directory.id === currentDirId) || null;

        const isRoot = !currentDir || currentDir.parentId === null;
        const isDir = currentDir ? currentDir.type === 'DIRECTORY' : false;

        const breadCrumb = await buildBreadCrumb(currentDir);

        res.render('index', {
            user: req.user,
            dirs,
            currentDirId,
            currentDir,
            formatDate,
            isRoot,
            isDir,
            breadCrumb,
            file: {},
            dirName: currentDir.name,
            formatFileSize,
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

const fileInfoRender = async (req, res) => {
    try {
        const userId = req.user.id;
        const fileId = req.params.fileId;

        const file = await getFileById(fileId);
        const dirs = await getAllUserDirectories(userId);

        res.render('file', {
            file: file,
            formatDate: formatDateDetailed,
            dirs: dirs,
            currentDirId: file.directoryId,
            isDir: false,
            dirName: null,
            formatFileSize: formatFileSize,
        });
    } catch (err) {
        console.error('Error rendering file information', err);
        res.redirect('/directory');
    }
};

// CREATE CONTROLLERS
const addDir = async (req, res) => {
    const dirName = req.body.dirName;
    const userId = req.user.id;
    const parentId = req.body.parentId;

    try {
        await createDirectory(dirName, userId, parentId);
        req.flash('success', 'Directory created successfully');
        res.redirect(`/directory/${parentId}`);
    } catch (err) {
        console.error('Error creating directory:', err);
        req.flash('error', 'Failed to create directory. Please try again.');
        res.redirect('/directory');
    }
};

const addFile = async (req, res) => {
    const uploadedFile = req.file;
    const parentId = req.body.parentId;
    const userId = req.user.id;

    if (!uploadedFile) {
        req.flash('error', 'No file uploaded.');
        return res.redirect(`/directory/${parentId}`);
    }

    try {
        const dirExists = await directoryExists(parentId);
        if (!dirExists) {
            req.flash('error', 'Parent directory does not exist.');
            return res.redirect(`/directory/${parentId}`);
        }

        const fileName = transliterate(
            iconv.decode(
                Buffer.from(uploadedFile.originalname, 'binary'),
                'utf-8'
            )
        );

        // Upload the file to Supabase
        const filePath = `${userId}/${fileName}`;
        const uploadedData = await uploadFileSB(filePath, uploadedFile);

        await createFile(
            fileName, // File name
            uploadedFile.mimetype, // File extension
            uploadedFile.size, // File size
            uploadedData.fullPath, // File path
            parentId // Parent directory ID
        );

        req.flash('success', 'File uploaded successfully');
        res.redirect(`/directory/${parentId}`);
    } catch (err) {
        console.error('Error creating file:', err);
        req.flash('error', 'Failed to create file. Please try again.');
        res.redirect(`/directory/${parentId}`);
    }
};

// DELETE CONTROLLERS
const deleteFileController = async (req, res) => {
    const fileId = req.body.fileId;
    const parentId = req.body.parentId;
    const userId = req.user.id;
    const fileName = req.body.fileName;

    const filePath = `${userId}/${fileName}`;

    try {
        await deleteFileSB(filePath);
        await deleteFile(fileId);
        req.flash('success', 'File deleted successfully');
        res.redirect(`/directory/${parentId}`);
    } catch (err) {
        console.error('Error deleting file:', err);
        req.flash('error', 'Error deleting file');
        res.redirect(`/directory/${parentId}`);
    }
};

const deleteDirController = async (req, res) => {
    const dirId = req.body.dirId;
    const parentId = req.body.parentId;
    const userId = req.user.id;

    try {
        await deleteDir(userId, dirId);
        req.flash(
            'success',
            'Directory and all of its contents deleted successfully'
        );
        res.redirect(`/directory/${parentId}`);
    } catch (err) {
        console.error('Error deleting directory:', err);
        req.flash('error', 'Error deleting directory and all of its contents');
        res.redirect(`/directory/${parentId}`);
    }
};

// UPDATE CONTROLLERS
const editDirController = async (req, res) => {
    const dirId = req.params.dirId;
    const newDirName = req.body.newDirName;

    try {
        await updateDirName(dirId, newDirName);
        req.flash('success', "Directory's name updated successfully");
        res.redirect(`/directory/${dirId}`);
    } catch (err) {
        console.error('Error deleting directory:', err);
        req.flash('error', 'Error updating directory');
        res.redirect(`/directory/${dirId}`);
    }
};

module.exports = {
    welcomePage,
    indexRender,
    fileInfoRender,
    addDir,
    addFile,
    deleteFileController,
    deleteDirController,
    editDirController,
};
