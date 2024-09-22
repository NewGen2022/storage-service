const express = require('express');
const router = express.Router();
const {
    logInRenderForm,
    logIn,
    logOut,
    signUpRenderForm,
    signUp,
} = require('../controllers/authController');
const { validateSignUp } = require('../middleware/validationMidware');

// ROUTES for - log in/out
router.get('/login', logInRenderForm);
router.get('/logout', logOut);

router.post('/login', logIn);

// ROUTES for - sign up
router.get('/signup', signUpRenderForm);
router.post('/signup', validateSignUp, signUp);

module.exports = router;
