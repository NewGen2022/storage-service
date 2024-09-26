const { validationResult } = require('express-validator');
const { createUser, getRootDir } = require('../db/queries');
const hashPassword = require('../public/js/hashPassword');
const passport = require('../config/passport');

const logInRenderForm = (req, res) => {
    res.status(200).render('login', { errors: req.flash('error') });
};

const logIn = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            req.flash('error', info.message);
            return res.render('login', {
                errors: req.flash('error'),
                prevUsername: req.body.username || '',
            });
        }
        req.logIn(user, async (err) => {
            if (err) {
                return next(err);
            }
            const rootDir = await getRootDir(req.user.id);
            return res.redirect(`/directory/${rootDir.id}`);
        });
    })(req, res, next);
};

const logOut = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/login');
    });
};

const signUpRenderForm = (req, res) => {
    res.status(200).render('signup', { errors: {}, prevData: {} });
};

const signUp = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('signup', {
            errors: errors.array() || {},
            prevData: req.body || {},
        });
    }

    const { username, password_1 } = req.body;
    const hashedPassword = await hashPassword(password_1);

    try {
        await createUser(username, hashedPassword);
        req.flash('success', 'Your account successfully created!');
        res.status(201).redirect('/login');
    } catch (error) {
        console.error('Error creating user:', error);
        req.flash('errors', 'Cannot create user: Internal server error');
        res.status(500).send('Internal server error');
    }
};

module.exports = { logInRenderForm, logIn, logOut, signUpRenderForm, signUp };
