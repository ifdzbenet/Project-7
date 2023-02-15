
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer.user.config');

//manipulation of fragile user info
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/deleteUser/:id', userCtrl.deleteUser);
router.put('/updateEmail', userCtrl.updateEmail);
router.put('/updatePassword', userCtrl.updatePassword);

//retrieval of user info
router.get('/userInfo', userCtrl.userinfoall);
router.get('/userInfo/:id', userCtrl.userinfo);
router.get('/getReadStatus/:id', userCtrl.getReadStatus);
router.post('/sendReadStatus/:id', userCtrl.sendReadStatus);
router.put('/updateProfile/:id', multer, userCtrl.updateProfile);

module.exports = router;
