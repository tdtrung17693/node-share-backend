import path from 'path'
import uploadConfig from '../config/upload'

const manager = {
    getDownloadPath (file) {
        return path.join(uploadConfig.storageDir, file.filename)
    }
}

export default manager
