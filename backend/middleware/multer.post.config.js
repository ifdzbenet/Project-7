const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination:'../public/image',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

module.exports = multer({storage: storage}).single('image');
