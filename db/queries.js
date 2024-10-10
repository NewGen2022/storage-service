const prisma = require('../db/prismaClient');
const { deleteFileSB } = require('../storage/supabase');

// CREATE QUERIES
const createUser = async (username, password) => {
    try {
        const user = await prisma.user.create({
            data: {
                username: username,
                password: password,
            },
        });

        await createDirectory(username, user.id);

        return user;
    } catch (err) {
        console.error('Error creating user:', err);
        throw err;
    }
};

const createDirectory = async (name, userId, parentId = null) => {
    try {
        const directory = await prisma.directory.create({
            data: {
                name: name,
                user: { connect: { id: userId } },
                parent: parentId ? { connect: { id: parentId } } : undefined,
            },
        });

        return directory;
    } catch (err) {
        console.error('Error creating directory:', err);
        throw err;
    }
};

const createFile = async (name, extension, size, path, parentId = null) => {
    try {
        const file = await prisma.file.create({
            data: {
                name: name,
                extension: extension,
                size: size,
                path: path,
                directory: { connect: { id: parentId } },
            },
        });

        return file;
    } catch (err) {
        console.error('Error creating file:', err);
        throw err;
    }
};

const createShareDirLink = async (
    itemId,
    expiresAt,
    itemType = 'DIRECTORY'
) => {
    try {
        const shareLink = await prisma.shareLink.create({
            data: {
                itemType: itemType,
                directoryId: itemId,
                expiresAt: expiresAt,
            },
        });

        return shareLink;
    } catch (err) {
        console.error('Error creating share link for directory:', err);
        throw err;
    }
};

const createShareFileLink = (itemId, expiresAt, itemType = 'FILE') => {};

// GET QUERIES
const getAllUserDirectories = async (userId) => {
    try {
        const directories = await prisma.directory.findMany({
            where: { userId: userId },
            include: { files: true, children: { include: { files: true } } },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return directories;
    } catch (err) {
        console.error('Error fetching directories:', err);
        throw err;
    }
};

const getRootDir = async (userId) => {
    try {
        const root = await prisma.directory.findFirst({
            where: { userId: userId, parentId: null },
        });
        return root;
    } catch (err) {
        console.error('Error fetching root dir:', err);
        throw err;
    }
};

const getDirById = async (dirId) => {
    try {
        const dir = await prisma.directory.findUnique({
            where: { id: dirId },
            select: {
                id: true,
                name: true,
                parentId: true,
            },
        });

        return dir;
    } catch (err) {
        console.error('Directory with ID ${parentId} not found:', err);
        throw err;
    }
};

const getFileById = async (fileId) => {
    try {
        const file = await prisma.file.findFirst({
            where: {
                id: fileId,
            },
        });

        if (!file) {
            throw new Error('File not found or access denied');
        }

        return file;
    } catch (err) {
        console.error('Error fetching file:', err);
        throw err;
    }
};

const getShareLinkByDirId = async (dirId) => {
    try {
        const dir = await prisma.shareLink.findFirst({
            where: { directoryId: dirId },
        });

        return dir;
    } catch (err) {
        console.error('Directory with ID ${parentId} not found:', err);
        throw err;
    }
};

// DELETE QUERIES
const deleteFile = async (fileId) => {
    try {
        await getFileById(fileId);

        // Delete the file
        await prisma.file.delete({
            where: { id: fileId },
        });

        return true;
    } catch (err) {
        console.error('Error deleting file:', err);
        throw err;
    }
};

const deleteDir = async (userId, dirId) => {
    try {
        // Fetch all files within the directory first
        const files = await prisma.file.findMany({
            where: { directoryId: dirId },
        });

        // Delete each file from Supabase
        for (const file of files) {
            const filePath = `${userId}/${file.name}`;
            await deleteFileSB(filePath);
        }

        // Delete all files in the database
        await prisma.file.deleteMany({
            where: { directoryId: dirId },
        });

        // Fetch all subdirectories first
        const subDirs = await prisma.directory.findMany({
            where: { parentId: dirId },
        });

        // Recursively delete all subdirectories
        for (const subDir of subDirs) {
            await deleteDir(userId, subDir.id);
        }

        // Delete the directory itself
        await prisma.directory.delete({
            where: { id: dirId },
        });

        return true;
    } catch (err) {
        console.error('Error deleting directory:', err);
        throw err;
    }
};

// UPDATE QUERIES
const updateDirName = async (dirId, newName) => {
    try {
        const updatedDir = await prisma.directory.update({
            where: { id: dirId },
            data: {
                name: newName,
            },
        });

        return updatedDir;
    } catch (err) {
        console.error('Error updating directory:', err);
        throw err;
    }
};

const updateFileName = async (fileId, newName, newPath) => {
    try {
        const updatedFile = await prisma.file.update({
            where: { id: fileId },
            data: {
                name: newName,
                path: newPath,
            },
        });

        return updatedFile;
    } catch (err) {
        console.error('Error updating file:', err);
        throw err;
    }
};

// OTHER QUERIES
const directoryExists = async (directoryId) => {
    const directory = await prisma.directory.findUnique({
        where: { id: directoryId },
    });
    return directory !== null; // Returns true if the directory exists
};

module.exports = {
    createUser,
    createDirectory,
    createFile,
    getAllUserDirectories,
    getRootDir,
    getFileById,
    getDirById,
    deleteFile,
    deleteDir,
    updateDirName,
    updateFileName,
    directoryExists,
    createShareDirLink,
    getShareLinkByDirId,
};
