const database = require('../database');
const jwt = require('jsonwebtoken');

// authorisation function to check the user's credentials
module.exports = async (req, res, next) => {
  try {
    const token = localStorage.getItem('token').split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    await database.query(`SELECT * FROM testing WHERE testID LIKE '${userId}'`, (err, result, fields) =>{
        if (result[0].testID && result[0].testID !== userId) {
            console.log('Invalid user ID');
            throw 'Invalid user ID';
        } else {
        console.log('yes');
        next();
        
        }
    })
    } catch {
        console.log('no');
        return res.status(401).json({
            error: new Error('Invalid request')
        });
    }
}; 
