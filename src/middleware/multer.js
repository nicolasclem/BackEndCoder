const  multer = require('multer')
const path = require('path')



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,path.resolve(`./public/img`))
    },
    filename:(req, file, cb)=> {
        const FileName = `image-${Date.now()}${path.extname(file.originalname)}`
        cb(null, FileName )
    }
})

const upload = multer({storage})

module.exports = upload