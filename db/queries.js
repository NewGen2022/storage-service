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
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
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
        console.error('Error creating directory:', error);
        throw error;
    }
};

const getAllDirectories = async () => {
    try {
        const directories = prisma.directory.findMany();
        return directories;
    } catch (err) {
        console.error('Error fetching directories:', error);
        throw error;
    }
};

module.exports = { createUser, createDirectory, getAllDirectories };
