// API and connection to the MYSQL database

const express = require('express');
const bodyParser = require('body-parser');
//const path = require('path');
const database = require('./database');

const userRoutes = require('./routes/user');
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
//app.use('/images', express.static(path.join(__dirname, 'images')));

// api endpoints for the paths
app.use('/', userRoutes);
//app.use('/api/post', postRoutes);


/*
app.get(`/userInfo/:id`, (req, res, next) => {
    let id =  req.params.id
    database.query(`SELECT * FROM testing WHERE testID LIKE ${id};`, (err, result, fields) => {
    if(err) {
        return console.log(err);
    }
    return res.status(200).send(result)
    })   
});

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.post(`/signup`, async (req, res, next) => {
    try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const hash = await bcrypt.hash(password, 10);
    await database.query(`INSERT INTO testing (firstName, lastName, email, password) VALUES ('${firstName}', '${lastName}', '${email}', '${hash}')`);
    res.status(200).json('All good!');
    } catch (error) {
        console.log(error);
        res.status(500).send('Something broke');
    }
});

app.post(`/login`, async (req, res, next) => {
    try {
        const email = req.body.email;
        await database.query(`SELECT * FROM testing WHERE email LIKE '${email}'`, (err, result, fields) =>{
            if(err) {
                return console.log(err);
            }
            //return res.status(200).send(result)
            //bcrypt
            bcrypt.compare(req.body.password, result[0].password, (error, valid) => {
                if (valid) {
                    // jsonwebtoken
                    const token = jwt.sign(
                        {userId: result[0].testID},
                        'RANDOM_TOKEN_SECRET',
                        {expiresIn: '24h'});
                        //localStorage.setItem('token', token);
                        //console.log(localStorage.getItem('token') );
                        return res.status(200).json({
                            userId: result[0].testID,
                            token: token
                        });
                    //

                } else if (error) { 
                    return res.status(500).json({
                        error: error
                    });
                }
            })
            
            //
        })
    } catch (error) {
            return res.status(500).json({
            error: error
        });
    }
});

app.get(`/auth`, (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
      const userId = decodedToken.testId;
      if (req.body.testId && req.body.testId !== userId) {
        throw 'Invalid user ID';
      } else {
        next();
      }
    } catch {
          res.status(401).json({
        error: new Error('Invalid request')
      });
    }
}); 
*/
module.exports = app;