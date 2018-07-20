import MulterAzureStorage from 'multer-azure-storage'
import uploadConfig from '../../config/upload'

const azureStorage = new MulterAzureStorage({
    azureStorageConnectionString: uploadConfig.azureConnectionString,
    containerName: 'files',
    containerSecurity: 'blob',
    fileName: file => {
        const fileName = file.originalname
        const now = Date.now()

        return `${now}-${fileName}`
    }
})

export default azureStorage
