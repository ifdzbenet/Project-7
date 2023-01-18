
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/userInfo', userCtrl.userinfoall);
router.get('/userInfo/:id', userCtrl.userinfo);

module.exports = router;
