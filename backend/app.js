// API and connection to the MYSQL database

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const database = require('./database');

//const userRoutes = require('./routes/user');
//const postRoutes = require('./routes/post');

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
app.use('/images', express.static(path.join(__dirname, 'images')));

// api endpoints for the paths
//app.use('/api/auth', userRoutes);
//app.use('/api/post', postRoutes);



app.use(`/userInfo/:id`, (req, res, next) => {
    let id =  req.params.id
    database.query(`SELECT * FROM user_info WHERE userID LIKE ${id};`, (err, result, fields) => {
    if(err) {
        return console.log(err);
    }
    return res.status(200).send(result)
    })   
});



module.exports = app;