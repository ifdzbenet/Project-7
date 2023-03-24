const express = require('express');
const router = express.Router();

// API calls
const topicCrtl = require('../controllers/topics'); 

router.get('/', topicCrtl.getAllTopics);
router.get('/:id', topicCrtl.getOneTopic);

module.exports = router;