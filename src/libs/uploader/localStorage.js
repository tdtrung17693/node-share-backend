import path from 'path'
import multer from 'multer'
import uploadConfig from '../../config/upload'

const localStorage = multer.diskStorage({
    destination (req, file, cb) {
        cb(null, uploadConfig.storageDir)
    },
    filename (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

export default localStorage
