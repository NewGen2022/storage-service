const express = require('express');
const router = express.Router();
const { isAuth } = require('../middleware/authMidware');

router.get('/', isAuth, (req, res) => {
    res.render('index', { user: req.user });
});

module.exports = router;
