const prisma = require('../db/prismaClient');

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

const createFile = async (name, parentId = null) => {
    try {
        const file = await prisma.file.create({
            data: {
                name: name,
                size: 0,
                directory: { connect: { id: parentId } },
            },
        });

        return file;
    } catch (err) {
        console.error('Error creating file:', err);
        throw err;
    }
};

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

//
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
    directoryExists,
};
