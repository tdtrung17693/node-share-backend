import multer from 'multer'
import config from '../../config/upload'
import localStorage from './localStorage'
import azureStorage from './azureStorage'

const storage = {
    'local': localStorage,
    'azure': azureStorage
}
const upload = multer({ storage: storage[config.engine] })

export default upload
