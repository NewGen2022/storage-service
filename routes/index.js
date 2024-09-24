const express = require('express');
const router = express.Router();
const { isAuth } = require('../middleware/authMidware');
const { welcomePage, indexRender } = require('../controllers/indexController');

router.get('/', welcomePage);

router.get('/directory', isAuth, indexRender);

module.exports = router;
