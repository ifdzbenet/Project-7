
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const dynamicCtrl = require('../controllers/dynamic');

router.get('/userPostInfo/:id', dynamicCtrl.userPostInfo);
router.post('/sendReadStatus/:id', dynamicCtrl.sendReadStatus);

module.exports = router;