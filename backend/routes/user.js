
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer.config');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/userInfo', userCtrl.userinfoall);
router.get('/userInfo/:id', userCtrl.userinfo);
router.get('/getReadStatus/:id', userCtrl.getReadStatus);
router.post('/sendReadStatus/:id', userCtrl.sendReadStatus);
router.put('/updateProfile/:id', multer, userCtrl.updateProfile);

module.exports = router;
