const multer = require('multer')
const path = require('path')
const fs = require('fs')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
}) 

const upload = multer({ storage: storage }).array('shoes_images')

function getPath(path) {
    const paths = path.split("\\")
    return "/" + paths[1] + "/" + paths[2]
}

const ImageController = {

    addImage: (req, res) => {
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                res.json({
                    success: false,
                    message: "Multer err " + err.message,
                    data: null
                })
            } else if (err) {
                res.json({
                    success: false,
                    message: "Unknown err " + err.message,
                    data: null
                })
            }
    
            const data = []
            req.files.forEach((file) => {
                const path = file.path
                data.push(getPath(path))
            })
    
            res.json({
                success: true,
                message: null,
                data: data
            })
        })
    },

    removeImage: (req, res) => {
        console.log(req.body.src)
        const filePath = req.body.src
        fs.unlinkSync('public/' + filePath);
        res.json({
            success: true,
            message: null,
            data: null
        })
    }

}

module.exports = ImageController