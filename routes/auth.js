const express = require('express');
const router = express.Router();
const { preventAuthRoutesIfAuth } = require('../middleware/authMidware');
const {
    logInRenderForm,
    logIn,
    logOut,
    signUpRenderForm,
    signUp,
} = require('../controllers/authController');
const { validateSignUp } = require('../middleware/validationMidware');

// ROUTES for - log in/out
router.get('/login', preventAuthRoutesIfAuth, logInRenderForm);
router.get('/logout', logOut);

router.post('/login', logIn);

// ROUTES for - sign up
router.get('/signup', preventAuthRoutesIfAuth, signUpRenderForm);
router.post('/signup', validateSignUp, signUp);

module.exports = router;
