const { validationResult } = require('express-validator');
const { createUser } = require('../db/queries');
const hashPassword = require('../public/js/hashPassword');

const logInRenderForm = (req, res) => {
    res.status(200).render('login');
};

const logOut = (req, res) => {
    console.log('LOGOUT');
    return;
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
        res.status(201).redirect('/login');
    } catch (error) {
        // Handle unexpected errors
        console.error('Error creating user:', error);
        res.status(500).send('Internal server error');
    }
};

module.exports = { logInRenderForm, logOut, signUpRenderForm, signUp };
