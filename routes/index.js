const express = require('express');
const router = express.Router();
const { isAuth } = require('../middleware/authMidware');

router.get('/', (req, res) => {
    res.render('welcome_page');
});

router.get('/directory', isAuth, (req, res) => {
    res.render('index', { user: req.user });
});

module.exports = router;
