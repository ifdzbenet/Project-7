const express = require('express');
const router = express.Router();

// middleware to be used
const auth = require('../middleware/auth');


// API calls
const topicCrtl = require('../controllers/topics'); 

router.get('/', topicCrtl.getAllTopics);
router.get('/:id', topicCrtl.getOneTopic);

module.exports = router;