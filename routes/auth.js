const express = require('express');
const router = express.Router();
const {
    logInRenderForm,
    logOut,
    signUpRenderForm,
    signUp,
} = require('../controllers/authController');
const { validateSignUp } = require('../middleware/validation');

// ROUTES for - log in/out

// ROUTES for - sign up
router.get('/signup', signUpRenderForm);
router.post('/signup', validateSignUp, signUp);

module.exports = router;
