// API and connection to the MYSQL database

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const database = require('./database');

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const dynamicRoutes = require('./routes/dynamic');
const topicRoutes = require('./routes/topics');

const app = express();
app.use(express.json());

// CORS 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

// upload pictures to the images folder through multer
app.use('/images', express.static(path.join(__dirname, 'image')));

// api endpoints for the paths
app.use('/', userRoutes);
app.use('/post', postRoutes);
app.use('/dynamic', dynamicRoutes);
app.use('/topics', topicRoutes);


module.exports = app;