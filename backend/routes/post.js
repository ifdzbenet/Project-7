const express = require('express');
const router = express.Router();
const path = require('path');

// middleware to be used
const multer = require('../middleware/multer.post.config');

// API calls
const postCrtl = require('../controllers/post'); 

router.get('/', postCrtl.getAllPosts);
router.get('/:id', postCrtl.getOnePost);
router.post('/', multer, postCrtl.createPost);
router.put('/update/:id', multer, postCrtl.updatePost);
router.delete('/:id', postCrtl.deletePost);


module.exports = router;