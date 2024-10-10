const { body } = require('express-validator');
const prisma = require('../db/prismaClient');
const {
    getShareLinkByDirId,
    deleteShareFileLink,
    deleteExpiredShareLinksForDir,
} = require('../db/queries');

const validateSignUp = [
    body('username')
        .trim()
        .notEmpty()
        .withMessage('Username is required')
        .isLength({ min: 3, max: 20 })
        .withMessage('Username must be between 3 and 20 characters long')
        .custom(async (username) => {
            const isUserExists = await prisma.user.findUnique({
                where: { username: username },
            });

            if (isUserExists) {
                throw new Error('Username already exists');
            }
        }),

    body('password_1')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('password_2').custom((confirm_password, { req }) => {
        if (confirm_password !== req.body.password_1) {
            throw new Error('Passwords do not match');
        }
        return true;
    }),
];

const isValidShareDirLink = async (req, res, next) => {
    const shareLink = await getShareLinkByDirId(req.params.dirId);

    if (!shareLink) {
        return res.status(401).render('error', {
            errorMsg: 'This directory is not shared',
            btnMsg: 'Go to website',
        });
    }

    const currentTime = new Date();

    if (currentTime > shareLink.expiresAt) {
        if (shareLink.itemType === 'DIRECTORY') {
            await deleteExpiredShareLinksForDir(shareLink.directoryId);
        } else if (shareLink.itemType === 'FILE') {
            await deleteShareFileLink(shareLink.fileId);
        }
        return res.status(401).render('error', {
            errorMsg: 'This directory is expired',
            btnMsg: 'Go to website',
        });
    }

    next();
};

module.exports = { validateSignUp, isValidShareDirLink };
