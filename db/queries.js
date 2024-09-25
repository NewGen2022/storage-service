const prisma = require('../db/prismaClient');

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
                userId: userId,
                parentId: parentId,
            },
        });

        return directory;
    } catch (err) {
        console.error('Error creating directory:', err);
        throw err;
    }
};

const getAllUserDirectories = async (userId) => {
    try {
        const directories = await prisma.directory.findMany({
            where: { userId: userId },
            include: { files: true },
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

module.exports = {
    createUser,
    createDirectory,
    getAllUserDirectories,
    getRootDir,
};
