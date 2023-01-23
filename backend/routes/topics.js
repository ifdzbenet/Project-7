const express = require('express');
const router = express.Router();

// middleware to be used
const auth = require('../middleware/auth');


// API calls
const topicCrtl = require('../controllers/topics'); 

router.get('/', topicCrtl.getAllTopics);
/*
router.post('/', auth, multer, postCrtl.createPost);
router.get('/:id', auth, postCrtl.getOnePost);
router.put('/:id', auth, multer, postCrtl.modifyPost);
router.delete('/:id', auth, postCrtl.deletePost);
*/

module.exports = router;