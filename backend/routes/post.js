const express = require('express');
const router = express.Router();
const path = require('path');

// middleware to be used
const auth = require('../middleware/auth');
const multer = require('../middleware/multer.config');

// API calls
const postCrtl = require('../controllers/post'); 

router.get('/', postCrtl.getAllPosts);
router.get('/:id', postCrtl.getOnePost);
router.post('/', multer, postCrtl.createPost);
/*
router.post('/', auth, multer, postCrtl.createPost);
router.put('/:id', auth, multer, postCrtl.modifyPost);
router.delete('/:id', auth, postCrtl.deletePost);
*/

module.exports = router;